from prometheus_client import start_http_server, Summary, Info, Gauge, Enum
import random
import time
import json
import sys
import datetime as dt
from os import environ

polls = []


station = environ.get("STATION", "A")
port = environ.get("PORT", 8000)

with open(f"polls_{station}.json") as polls_file:
    polls = json.load(polls_file)

# Create a metric to track time spent and requests made.
REQUEST_TIME = Summary("request_processing_seconds", "Time spent processing request")

info = Info("ev_charger", "EV Charger name and position")
info.info({"charger_name": station})
payment_mode = Enum(
    "payment_method", "Payment method currently used", states=["", "RFID", "CREDITCARD"]
)
port_type = Enum(
    "port_type", "Port type currently used", states=["", "CHADEMO", "DCCOMBOTYP1"]
)
session_initiated_by = Enum(
    "session_initiated_by", "Session initiated by", states=["", "MOBILE", "DEVICE"]
)

kwh = Gauge("kwh", "Description of gauge")


# Decorate function with metric.
def process_request():
    now = dt.datetime.now()
    now = now - dt.timedelta(
        minutes=now.minute % 5, seconds=now.second, microseconds=now.microsecond
    )
    now = now.replace(month=random.randint(1, 8), year=2019)

    i = 0
    for poll in polls:
        if str(now) == poll[0]:
            break

        i += 1

    for poll in polls[i:]:
        info.info({"session_id": poll[2]})
        kwh.set(poll[5])
        session_initiated_by.state(poll[1])
        port_type.state(poll[3])
        payment_mode.state(poll[4])
        print(poll)
        sys.stderr.write(str(poll))
        time.sleep(5 * 60)


if __name__ == "__main__":
    start_http_server(port)
    while True:
        process_request()
