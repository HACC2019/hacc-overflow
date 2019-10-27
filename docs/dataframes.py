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


def clean_dataframe(df):
    df[SESSION_AMOUNT] = df[SESSION_AMOUNT].str.replace('$', '')
    df[SESSION_AMOUNT] = df[SESSION_AMOUNT].astype("float64")

    df[START_TIME] = df[START_TIME].astype("datetime64")
    df[END_TIME] = df[END_TIME].astype("datetime64")

    df.sort_values(by=START_TIME,  inplace=True, ascending=True)

    df_a = df.where(df[CHARGE_STATION_NAME] == "A")
    df_b = df.where(df[CHARGE_STATION_NAME] == "B")

    df_a.dropna(inplace=True)
    df_b.dropna(inplace=True)

    return df_a, df_b


data_frame = pd.read_csv(F_NAME)
dataframe_a, dataframe_b = clean_dataframe(data_frame)



