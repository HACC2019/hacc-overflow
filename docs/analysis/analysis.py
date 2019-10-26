import pandas as pd
import matplotlib.pyplot as plt

F_NAME = 'Data_HACC.csv'

# Column names
CHARGE_STATION_NAME = "Charge Station Name"
SESSION_INITIATED_BY = "Session Initiated By"
START_TIME = "Start Time"
END_TIME = 'End Time'
DURATION = 'Duration'
ENERGY = 'Energy(kWh)'
SESSION_AMOUNT = 'Session Amount'
SESSION_ID = 'Session Id'
PORT_TYPE = 'Port Type'
PAYMENT_MODE = 'Payment Mode'


def init():
    df = pd.read_csv(F_NAME)
    df = clean_dataframe(df)
    return df


def clean_dataframe(df):
    df[SESSION_AMOUNT] = df[SESSION_AMOUNT].str.replace('$', '')
    df[SESSION_AMOUNT] = df[SESSION_AMOUNT].astype("float64")

    df[START_TIME] = df[START_TIME].astype("datetime64")
    df[END_TIME] = df[START_TIME].astype("datetime64")

    df.set_index(START_TIME, inplace=True)

    return df

def main (df):
    plot = df.plot()

df = init()

