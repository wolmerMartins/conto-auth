#! /bin/sh

start_dev() {
  docker compose watch --prune
}

start_logging() {
  has_started=0

  while [ $has_started -eq 0 ];
  do
    docker compose ps | grep "Up" && has_started=1;
  done

  docker compose logs --follow
}

stop_dev() {
  docker compose down -v

  trap - SIGINT
}

(trap 'stop_dev && kill 0' SIGINT; start_dev & start_logging)
