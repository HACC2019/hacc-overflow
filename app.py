from flask import Flask, request, render_template, jsonify, Response
from flask_cors import CORS
from flask_redis import FlaskRedis
from flask_api.avg_duration import get_avg
from flask_api.get_power import get_power, get_power_blueprint

import geohash2

# define app and allow CORS
app = Flask(__name__, static_folder="client/build/static", template_folder="build")
CORS(app)

# register apis from modules
app.register_blueprint(get_avg.avg_duration_api, url_prefix="/api")
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
    redis_client.set(f"lookup:{geohash}", geohash, ex=(60 * 60 * 24))  # store
    return jsonify({"message": "success"}), 200


@app.route("/lookups", methods=["GET"])
def lookups():
    """Return stored EV charger lookups position in Prometheus readable format"""
    output = ""
    for lookup in redis_client.scan_iter("lookup:*"):
        # TODO there should be a cleaner implementation
        output += 'lookup{{geohash="{}"}} 2.0\n'.format(
            lookup.decode("utf-8").split(":")[1]
        )
    return Response(response=output, mimetype="text/plain")


@app.route("/api/hello", methods=["GET", "POST"])
def hello():
    try:
        name = request.json["name"]
    except KeyError:
        name = "World"

    return jsonify({"message": f"Hello, {name}!"}), 200


@app.route("/")
def client():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=5000, threaded=True)