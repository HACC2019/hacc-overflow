# hacc-overflow

A web application that has both user and admin components. the Administration
component displays key metrics of EV charging stations across Hawaii with
predictive analysis of congestion and health of the stations. The user
component shows the nearest location and estimated availability of each
station. The usage of the user component will be monitored to predict where new
stations should be installed.

## Getting Started

These instructions will show you how to get the project up and running in
development mode on your local machine. 

### Prerequisites 
* Node.js and npm
* Python 3

### Installing

1. In the root of the project directory, create a Python 3 virtual environment
   with `python3 venv venv`.
2. Use the virtual environment with `source venv/bin/activate`.
3. Install python 3 dependencies with `pip install -r requirements.txt`.
3. In the `client` directory, install node modules with `npm install`.
4. While in the `client` directory, start the react development server with
   `npm run start`.
5. Using a separate process in the root of the project directory, start the
   flask server with `python app.py`.

The react development server should be running on `http://localhost:3000/` and
the flask server should be running on `http://localhost:5000/`. Note that the
flask server tries to serve the production ready client code for the route:
`/`, and will throw an error if this route is requested. to build the client
code, go into the client directory and run `npm run build`.

## Backend

Various parts of the backend, this is still work in progress

### `ev_charger_simulator.py`

The tool uses the provided CSV and simulates a EV charger station. This is done
by showing every 5 minutes data based on the CSV. The data contains positions,
kwh and paymnt methods to show an overview in the internal backend.

Run it via the `Dockerfile`. Check the first lines of the file to see what
`env` variables are used.

### `converter.py`

The converter simply turns the given CSV file into a JSON file used by the
simulator above. The simulator can iterate over it in 5 minute intervals.
