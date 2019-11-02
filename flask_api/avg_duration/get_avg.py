import os
import json
from flask import request, jsonify, Blueprint

script_dir = os.path.dirname(__file__)

STATION_A = "station_a"
STATION_B = "station_b"

STATION_A_F_NAME = os.path.join(script_dir, "station_A_Averages.json")
STATION_B_F_NAME = os.path.join(script_dir, "station_B_Averages.json")

stations_to_avg_files = [(STATION_A, STATION_A_F_NAME), (STATION_B, STATION_B_F_NAME)]

stations_to_avgs = {
    STATION_A: {},
    STATION_B: {}
}

for station_name, f_name in stations_to_avg_files:
    with open(f_name) as json_file:
        data = json.load(json_file)
        stations_to_avgs[station_name] = data

get_avg_blueprint = Blueprint('getavg_api', __name__)


@get_avg_blueprint.route('/avg-duration', methods=["GET"])
def get_avg():
    """
    Returns average duration of a charge for a given hour and station.
    Args (GET):
        station (string): station name in form 'station_X' where X is the station id.
        hour (int): hour (0-23)
    Returns (JSON):
        average (200): found average for given hour
        error (400): if params are missing or an average was not be found.
    """

    station = request.args.get("station")
    hour = request.args.get("hour")

    if not station or not hour:
        return jsonify({"error": "No station or hour was given."}), 400

    try:
        avg = stations_to_avgs[station][hour]
    except KeyError:
        return jsonify({"err": "Unable to find average with given station and hour"}), 400

    return jsonify({"average": avg}), 200
