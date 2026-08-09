#!/usr/bin/env bash
set -euo pipefail

# Apply database migrations before starting anything.
python manage.py migrate --noinput

# Start the MQTT consumer in the background (parallel to the web server).
python manage.py start_sensor_ingestion &
consumer_pid=$!

# If the consumer dies, take the whole container down so it gets restarted.
trap 'kill "$consumer_pid" 2>/dev/null || true' EXIT

# Start the Django web server in the foreground (PID 1's main process).
python manage.py runserver 0.0.0.0:8000 &
server_pid=$!

# Exit as soon as either process exits, propagating its status.
wait -n "$consumer_pid" "$server_pid"
exit $?
