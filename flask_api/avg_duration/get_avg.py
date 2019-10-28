import json
from flask import request, jsonify, Blueprint

STATION_A = "station_a"
STATION_B = "station_b"

STATION_A_F_NAME = "flask_api/get_average/station_A_Averages.json"
STATION_B_F_NAME = "flask_api/get_average/station_B_Averages.json"

stations_to_avg_files = [(STATION_A, STATION_A_F_NAME), (STATION_B, STATION_B_F_NAME)]

stations_to_avgs = {
    STATION_A: {},
    STATION_B: {}
}

for station_name, f_name in stations_to_avg_files:
    with open(f_name) as json_file:
        data = json.load(json_file)
        stations_to_avgs[station_name] = data

getavg_api = Blueprint('getavg_api', __name__)

@getavg_api.route('/getavg', methods=["GET", "POST"])
def average():
    station = None
    hour = None
    try:
        station = request.json["station"]
        if station not in stations_to_avgs:
            return jsonify({"err": "Station not found."}), 400

    except TypeError:
        return jsonify({"error": "No post json data was given."}), 400
    except KeyError:
        return jsonify({"error": "No station name was given."}), 400

    try:
        hour = str(request.json["hour"])
    except KeyError:
        return jsonify({"error": "No hour was given."}), 400
    except ValueError:
        return jsonify({"error": "hour was not able to be casted to int"}), 400

    try:
        print(station)
        print(hour)
        avg = stations_to_avgs[station][hour]
    except KeyError:
        return jsonify({"err": "Unable to find average with given station and hour"}), 400

    return jsonify({"average": avg}), 200


