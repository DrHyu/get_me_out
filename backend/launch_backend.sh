docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
sudo docker-compose build
sudo docker-compose up

