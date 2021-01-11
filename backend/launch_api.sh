docker build . -t gmo_backend -f API/Dockerfile
docker run --name postgis -e POSTGRES_PASSWORD=yolo -d postgis/postgis
docker run -p 8080:8080 -i -t gmo_backend

#docker build . -t gmo_backend -f backend/Dockerfile
#docker run -p 8080:8080 -i -t gmo_backend