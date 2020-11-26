FROM amazonlinux:latest

ENV PORT 3000

# Create app directory
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yum install -y gcc-c++ make && \
    curl -sL https://rpm.nodesource.com/setup_12.x | bash && \
    yum install -y nodejs && \
    npm install yarn -g && \
    yarn install && \
    yarn run build



# Add Entrypoint
COPY script/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]