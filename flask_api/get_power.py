from flask import request, jsonify, Blueprint
import numpy as np

get_power_blueprint = Blueprint('get_power_blueprint', __name__)

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
    c = np.divide(-a, 1 + b*np.sqrt(t))

    def f(x):
        if x >= t:
            return 0.0  # function should always go to 0 after time t
        return c + np.divide(a, 1 + b*np.sqrt(x))

    return f


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
        energy = np.double(energy)
        energy = energy * 60
        intervals = int(intervals)
    except ValueError:
        return jsonify({"error": "given was unable to be casted to numbers."}), 400

    f = get_power_func(energy, duration)
    interval_len = np.divide(duration, intervals)

    power_by_interval = [f(i * interval_len) for i in range(intervals)]

    return jsonify({"power_by_interval": power_by_interval}), 200
