docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker-compose build
docker-compose up > log.txt