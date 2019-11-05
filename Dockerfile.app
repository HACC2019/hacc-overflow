FROM node:10
COPY client/ client/
WORKDIR client/
RUN npm install
RUN npm run build


FROM python:3

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY flask_api/ flask_api/
COPY --from=0 client/build/ client/build/

CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
