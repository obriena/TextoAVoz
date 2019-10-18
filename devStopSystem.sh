#!/bin/sh

cd docker/data
docker-compose down

cd ../..
cd services
mvn install
mvn liberty:stop-server

