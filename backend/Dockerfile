# Pull official base image
FROM amazonlinux:latest

# Set environment variables
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV LC_MESSAGES en_US.UTF-8


# Copy project
COPY ./gmo_backend /usr/src/app

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
RUN yum install -y gcc openssl-devel bzip2-devel libffi-devel tar wget gzip make python37 && \
    wget https://kojipkgs.fedoraproject.org//packages/sqlite/3.8.11/1.fc21/x86_64/sqlite-3.8.11-1.fc21.x86_64.rpm && \
    yum install -y sqlite-3.8.11-1.fc21.x86_64.rpm  && /
    rm sqlite-3.8.11-1.fc21.x86_64.rp

RUN curl -O https://bootstrap.pypa.io/get-pip.py \
    && python3 get-pip.py --user \
    && python3 -m pip install -r requirements.txt


# Add Entrypoint
COPY script/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]