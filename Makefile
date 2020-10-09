#Production 
start:
	docker container start db blog-api
build:
	./boot.sh
stop:
	docker container stop blog-api db
destroy: stop
	docker network rm blog-api-network
	docker container rm blog-api db
	docker image rm blog-api

#Development
dev-start:
	docker-compose up --detach
dev-build:
	docker-compose up --detach --build;
dev-shell:
	docker-compose exec api bash
dev-stop:
	docker-compose stop
dev-destroy:
	docker-compose down --volume