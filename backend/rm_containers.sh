docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
#docker run -p 5432:5432 --name postgis -e POSTGRES_USER=django  -e POSTGRES_PASSWORD=yolo -d postgis/postgis:11-master