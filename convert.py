import csv
import datetime as dt
import json
import numpy as np

# a, b, c are constants used in power function
b = np.float64("0.0786688810066")


def get_power_func(energy, duration):
    # given energy, and duration, generates power function.
    # energy must be in kwM and duration must be in minutes, since function maps
    # given HECO graph.
    e = energy
    t = duration

    a_numerator = np.square(b) * e * (b * np.sqrt(t) + 1)
    a_denominator = np.square(b) * t
    a_denominator = a_denominator + 2 * b * np.sqrt(t)
    a_denominator = a_denominator - 2 * b * np.sqrt(t) * np.log(b * np.sqrt(t) + 1)
    a_denominator = a_denominator - 2 * np.log(b * np.sqrt(t) + 1)
    a = np.divide(a_numerator, a_denominator)
    c = np.divide(-a, 1 + b * np.sqrt(t))

    def f(x):
        if x >= t:
            return 0.0  # function should always go to 0 after time t
        return c + np.divide(a, 1 + b * np.sqrt(x))

    return f


def get_power(energy, duration, intervals):
    if not duration or not energy or not intervals:
        return {"error": "duration, energy, or intervals missing."}

    try:
        duration = np.double(duration)
        duration = np.divide(duration, 60)  # found function is in minutes
        energy = np.double(energy)
        energy = energy * 60
        intervals = int(intervals)
    except ValueError:
        return {"error": "given was unable to be casted to numbers."}

    f = get_power_func(energy, duration)
    interval_len = np.divide(duration, intervals)

    power_by_interval = [f(i * interval_len) for i in range(intervals)]

    return power_by_interval


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
        while start_mod > polls[-1][0] + dt.timedelta(
            minutes=5 - (polls[-1][0].minute % 5)
        ):
            polls.append(
                [
                    polls[-1][0] + dt.timedelta(minutes=5 - (polls[-1][0].minute % 5)),
                    "",
                    "",
                    "",
                    "",
                    0.0,
                ]
            )
        duration = int((end - start_mod).total_seconds() / 60)

        power_by_interval = get_power(line["Energy(kWh)"], duration, duration)
        for i in range(0, duration):
            if line["Charge Station Name"] != station:
                continue

            polls.append(
                [
                    start_mod + dt.timedelta(minutes=i),
                    line["Session Initiated By"],
                    line["Session Id"],
                    line["Port Type"],
                    line["Payment Mode"],
                    power_by_interval[i],
                ]
            )


with open(f"polls_{station}.json", "w") as polls_file:
    json.dump(polls, polls_file, default=str, indent="  ")
