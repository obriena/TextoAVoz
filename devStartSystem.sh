#!/bin/sh

cd docker/data
docker-compose up -d

cd ../../
cd services
mvn install
mvn liberty:start-server 

cd ../
cd angular/transcribir
ng serve
