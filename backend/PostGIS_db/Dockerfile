FROM amazonlinux:latest

# Set environment variables
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV LC_CTYPE en_US.UTF-8
ENV LC_MESSAGES en_US.UTF-8

ENV PREFIX /usr/local/
ENV PKG_CONFIG_PATH=$PREFIX/lib/pkgconfig/
ENV LD_LIBRARY_PATH=$PREFIX/lib/


# Install dependencies
RUN yum install -y gcc-c++.x86_64 cpp.x86_64 bzip2 libtiff.x86_64 cmake3.x86_64 openssl-devel \
    tar wget gzip make

RUN wget https://kojipkgs.fedoraproject.org//packages/sqlite/3.8.11/1.fc21/x86_64/sqlite-3.8.11-1.fc21.x86_64.rpm && \
    yum install -y sqlite-3.8.11-1.fc21.x86_64.rpm  && \
    rm sqlite-3.8.11-1.fc21.x86_64.rpm

RUN wget https://kojipkgs.fedoraproject.org//packages/sqlite/3.8.11/1.fc21/x86_64/sqlite-devel-3.8.11-1.fc21.x86_64.rpm&& \
    yum install -y sqlite-devel-3.8.11-1.fc21.x86_64.rpm  --exclude sqlite.otherarch && \
    rm sqlite-devel-3.8.11-1.fc21.x86_64.rpm

RUN wget http://download.osgeo.org/proj/proj-6.2.0.tar.gz && \
    tar -zxvf proj-6.2.0.tar.gz && \
    cd proj-6.2.0; ./configure; make; make install; ldconfig; cd ..

RUN wget http://download.osgeo.org/geos/geos-3.7.0.tar.bz2 && \
    tar jxvf geos-3.7.0.tar.bz2 && \
    cd geos-3.7.0; ./configure; make; make install; ldconfig; cd ..

RUN wget http://download.osgeo.org/gdal/3.1.0/gdal-3.1.0.tar.gz && \
    tar -xzf gdal-3.1.0.tar.gz && \
    cd gdal-3.1.0; touch config.rpath && \
    ./configure && \
    make; make install; ldconfig; cd ..

RUN yum install -y libxml2-devel minizip minizip-devel
RUN wget https://www.gaia-gis.it/gaia-sins/libspatialite-sources/libspatialite-5.0.0.tar.gz && \
    tar -xzf libspatialite-5.0.0.tar.gz && \
    cd libspatialite-5.0.0 && \
    ./configure --enable-freexl=no  --without-python && \
    make; make install; ldconfig; cd ..

# Postgres
RUN yum -y install gcc gcc-c++ make cmake libtool libcurl-devel libxml2-devel rubygems swig fcgi-devel\
                    libtiff-devel freetype-devel curl-devel libpng-devel giflib-devel libjpeg-devel\
                    cairo-devel freetype-devel readline-devel openssl-devel python27 python27-devel

RUN amazon-linux-extras enable postgresql10; yum install -y postgresql-server postgresql-devel json-c-devel

RUN wget http://download.osgeo.org/postgis/source/postgis-3.0.1.tar.gz && \
    tar -xzf postgis-3.0.1.tar.gz && \
    cd postgis-3.0.1; touch config.rpath && \
    ./configure && \
    make; make install; ldconfig; cd ..


# Add Entrypoint
# Copy scripts
ADD scripts /scripts
WORKDIR /scripts
RUN chmod +x *.sh


EXPOSE 5432
ENTRYPOINT ["/entrypoint.sh"]