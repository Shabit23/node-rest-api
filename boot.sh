#!/bin/bash
set -e

printf "creating network --->\n"
docker network create blog-api-network;
printf "network created --->\n"

printf "\n"

printf "starting db container --->\n"
docker container run \
    --detach \
    --name=db \
    --env MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME \
    --env MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD \
    --network=blog-api-network \
    mongo:4.1.8-xenial;
printf "db container started --->\n"

printf "\n"

printf "creating api image --->\n"
docker image build . --tag blog-api;
printf "api image created --->\n"
printf "starting api container --->\n"
docker container run \
    --detach \
    --name=blog-api \
    --env-file .env \
    --publish=3000:3000 \
    --network=blog-api-network \
    blog-api;
printf "api container started --->\n"

printf "\n"

printf "all containers are up and running"
