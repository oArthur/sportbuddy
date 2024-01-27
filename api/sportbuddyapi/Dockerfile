FROM python:3.10.9
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install -U channels["daphne"]
RUN pip install channels_redis
COPY . .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]