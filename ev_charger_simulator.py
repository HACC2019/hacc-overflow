from prometheus_client import start_http_server, Summary, Info, Gauge, Enum
import random
import time
import json
import geohash2
import sys
import datetime as dt
from os import environ

# these environment variables are setable in the docker-compose.yml

# station name, a corresponding json file must exists
station = environ.get("STATION", "A")

# what port to listen on
port = environ.get("PORT", 8000)

# position
latitude = float(environ.get("LAT", 21.300672))
longitude = float(environ.get("LONG", -157.851773))
geohash = geohash2.encode(latitude, longitude)


polls = []
with open(f"polls_{station}.json") as polls_file:
    polls = json.load(polls_file)

metrics_prefix = "evc_"  # electic vehicle charger

# general information about the charger
info = Info(f"{metrics_prefix}meta", "EV Charger name meta information")

payment_mode = Enum(
    f"{metrics_prefix}payment_method",
    "Payment method currently used",
    states=["", "RFID", "CREDITCARD"],
)
port_type = Enum(
    f"{metrics_prefix}port_type",
    "Port type currently used",
    states=["", "CHADEMO", "DCCOMBOTYP1"],
)
session_initiated_by = Enum(
    f"{metrics_prefix}session_initiated_by",
    "Session initiated by",
    states=["", "MOBILE", "DEVICE", "WEB"],
)

kwh = Gauge(f"{metrics_prefix}kwh", "Current kwh usage")
last_charge_seconds = Gauge(
    f"{metrics_prefix}last_charge", "UNIX timestamp of last use"
)


# Decorate function with metric.
def process_request():
    now = dt.datetime.now()
    now = now - dt.timedelta(
        minutes=now.minute % 5, seconds=now.second, microseconds=now.microsecond
    )
    random_month = random.randint(1, 8)
    now = now.replace(month=random_month)

    i = 0
    for poll in polls:
        if str(now) == poll[0]:
            break

        i += 1

    for poll in polls[i:]:
        # sleep until the next poll is due or skip if poll is in the past
        sleep_seconds = (
            dt.datetime.strptime(poll[0], "%Y-%m-%d %H:%M:%S")
            - dt.datetime.now().replace(month=random_month)
        ).total_seconds()
        if sleep_seconds > 0:
            print(f"Gonna sleep for {sleep_seconds} seconds")
            time.sleep(sleep_seconds)

        info.info(
            {
                "charger_name": f"Station {station}",
                "latitude": str(latitude),
                "longitude": str(longitude),
                "geohash": geohash,
                "session_id": poll[2],
            }
        )
        kwh.set(poll[5])
        # update the last_charge value if a charge is detected
        if poll[5] > 0:
            last_charge_seconds.set_to_current_time()

        session_initiated_by.state(poll[1])
        port_type.state(poll[3])
        payment_mode.state(poll[4])
        sys.stderr.write(str(poll) + "\n")


if __name__ == "__main__":
    sys.stderr.write("Starting EV Simulator\n")
    start_http_server(port)
    while True:
        process_request()
