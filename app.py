from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="client/build/static", template_folder="build")

CORS(app)


@app.route('/api/hello', methods=["GET", "POST"])
def hello():
	try:
		name = request.json["name"]
	except KeyError:
		name = "World"

	return jsonify({"message": f'Hello, {name}!'}), 200

@app.route("/")
def client():
	return render_template('index.html')


if __name__ == '__main__':
	app.run(port=5000, threaded=True)
