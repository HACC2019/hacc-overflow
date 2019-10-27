import json

import pandas as pd
from dataframes import DURATION, START_TIME


def generate_average_per_hour(dataframe, f_name):
    num_hours = [i for i in range(1, 24)]
    averages = [calc_average_duration(dataframe, hour) for hour in num_hours]
    hours_to_avgs = dict(zip(num_hours, averages))
    with open(f_name, 'w') as outfile:
        json.dump(hours_to_avgs, outfile)


def calc_average_duration(dataframe, hour):
    df = dataframe.copy(deep=True)

    # drop rows with negative duration values
    df = df[~df[DURATION].str.contains("-")]
    # cast duration to time delta
    df[DURATION] = pd.to_timedelta(df[DURATION])

    df = df[df[START_TIME].dt.hour == hour]
    return str(df[DURATION].mean())