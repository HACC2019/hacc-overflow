import csv
import datetime as dt
import json


header = [
    "Charge Station Name",
    "Session Initiated By",
    "Start Time",
    "End Time",
    "Duration",
    "Energy(kWh)",
    "Session Amount",
    "Session Id",
    "Port Type",
    "Payment Mode",
]

station = "B"

polls = [[dt.datetime(2018, 9, 1, 7, 20), "", "", "", "", 0.0]]

with open("Data_HACC.csv") as csv_file:
    reader = csv.DictReader(csv_file)

    for line in reader:
        # the CSV file is inconsistent regarding the date format
        try:
            start = dt.datetime.strptime(line["Start Time"], "%m-%d-%y %H:%M:%S")
            end = dt.datetime.strptime(line["End Time"], "%m-%d-%y %H:%M:%S")
        except ValueError:
            start = dt.datetime.strptime(line["Start Time"], "%m/%d/%Y %H:%M:%S")
            end = dt.datetime.strptime(line["End Time"], "%m/%d/%Y %H:%M:%S")
        if (start.minute % 5) == 0 and (start.second > 0):
            start += dt.timedelta(minutes=5)

        start_mod = start - dt.timedelta(minutes=start.minute % 5, seconds=start.second)

        # fill gaps between events
        while start_mod > polls[-1][0] + dt.timedelta(minutes=5):
            polls.append([polls[-1][0] + dt.timedelta(minutes=5), "", "", "", "", 0.0])
        duration = int((end - start_mod).total_seconds() / 60 / 5) + 1
        for i in range(0, duration):
            if line["Charge Station Name"] != station:
                continue
            polls.append(
                [
                    start_mod + dt.timedelta(minutes=5 * i),
                    line["Session Initiated By"],
                    line["Session Id"],
                    line["Port Type"],
                    line["Payment Mode"],
                    float(line["Energy(kWh)"]) / duration,
                ]
            )


with open(f"polls_{station}.json", "w") as polls_file:
    json.dump(polls, polls_file, default=str, indent="  ")
