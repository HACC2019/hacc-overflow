from flask import request, jsonify, Blueprint
import numpy as np

get_power_blueprint = Blueprint('get_power_blueprint', __name__)


@get_power_blueprint.route('/get_power', methods=["GET"])
def get_power():
    """
    Returns average duration of a charge for a given hour and station.
    Args (GET):
        duration (double): duration of a charge in seconds.
        energy (double): Total KwH
        intervals (int): How many intervals returned.
    Returns (JSON):
        power_by_interval (200): array of power values (Kw) by interval.
    """

    duration = request.args.get("duration")
    energy = request.args.get("energy")
    intervals = request.args.get("intervals")

    if not duration or not energy or not intervals:
        return jsonify({"error": "duration, energy, or intervals missing."}), 400

    try:
        duration = np.double(duration)
        duration = np.divide(duration, 60)  # found function is in minutes
        energy = np.double(duration)
        intervals = int(intervals)
    except ValueError:
        return jsonify({"error": "given was unable to be casted to numbers."}), 400

    if duration <= .5:
        return jsonify(({"error": "duration too short, function is undefined"}))

    c = np.divide(1, (16 * duration - 8))
    k = -4 * energy * np.sqrt(c) * np.sqrt(duration + c)
    k = np.divide(k, np.sqrt(c) - np.sqrt(duration + c))
    j = np.divide(-k, np.sqrt(duration + c))

    f_of_x = lambda x: np.divide(k, np.sqrt(x + c)) + j

    interval_len = np.divide(duration, intervals)

    power_by_interval = [f_of_x(i * interval_len) for i in range(intervals)]

    return jsonify({"power_by_interval": power_by_interval}), 200
