from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask_redis import FlaskRedis
from flask_api.avg_duration.get_avg import get_avg_blueprint
from flask_api.get_power import get_power_blueprint
import geohash2
import datetime

# define app and allow CORS
app = Flask(__name__)
CORS(app)

# register apis from modules
app.register_blueprint(get_avg_blueprint, url_prefix="/api")
app.register_blueprint(get_power_blueprint, url_prefix="/api")

app.config["REDIS_URL"] = "redis://redis:6379/0"
redis_client = FlaskRedis(app)


@app.route("/lookup", methods=["GET"])
def lookup():
    """Add EV charger lookup to to redis
    Automatically converts coordinates to geohash to be stored in database
    Args (GET):
        latitude (float): Latitude of lookup
        longitdue (float): Longitude of lookup
        geohash (str): Geohash of lookup
    Returns (JSON):
        message (200): if successfully added lookup to redis
        error (400): if coordinates and Geohash are missing
    """
    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")
    geohash = request.args.get("geohash")

    # error out when no coordinates given
    if not ((latitude and longitude) or geohash):
        return jsonify({"error": "require coordinates or geohash"}), 400

    # convert coordinates to geohash
    if not geohash:
        geohash = geohash2.encode(float(latitude), float(longitude))

    # add lookup to redis
    current_time = int(datetime.datetime.utcnow().timestamp())
    redis_client.set(f"lookup:{geohash}:{current_time}", 1, ex=(60 * 60 * 24))  # store
    return jsonify({"message": "success"}), 200


@app.route("/lookups", methods=["GET"])
def lookups():
    """Return stored EV charger lookups position in Prometheus readable format"""
    output = ""
    for lookup in redis_client.scan_iter("lookup:*"):
        print(lookup.decode())
        _, geohash, timestamp = lookup.decode().split(":")
        # geohash is shortened by 1 to sum up lookups at similar places
        output += 'lookup{{geohash="{}", id="{}"}} 2.0\n'.format(
            geohash[:-1], str(datetime.datetime.utcfromtimestamp(int(timestamp)))
        )
    return Response(response=output, mimetype="text/plain")


if __name__ == "__main__":
    app.run(port=5000, threaded=True)
