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

#RUN yum install -y gcc openssl-devel bzip2-devel libtiff.x86_64 libffi-devel tar wget gzip make python37 && \
#    wget https://kojipkgs.fedoraproject.org//packages/sqlite/3.8.11/1.fc21/x86_64/sqlite-3.8.11-1.fc21.x86_64.rpm && \
#    yum install -y sqlite-3.8.11-1.fc21.x86_64.rpm  && \
#    rm sqlite-3.8.11-1.fc21.x86_64.rpm

#RUN wget http://download.osgeo.org/libtiff/tiff-4.0.10.tar.gz && \
#    tar -zxvf tiff-4.0.10.tar.gz && \
#    cd tiff-4.0.10; LDFLAGS="-L/usr/local/lib -Wl,-rpath /usr/local/lib" ./configure; make; make install; ldconfig; cd ..

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
    ./configure --enable-freexl=no  && \
    make; make install; ldconfig; cd ..
 # --enable-lwgeom=yes --enable-libxml2=yes

WORKDIR /usr/src/app

#RUN yum install -y python37 python37-dev
#RUN yum install -y python3-devel
#RUN gdalinfo --version



# Copy project
COPY ./gmo_backend /usr/src/app
RUN yum install -y python37 python37-dev python3-devel
RUN amazon-linux-extras enable postgresql11; yum install -y postgresql postgresql-devel libpq-devel cairo-devel gobject-introspection-devel cairo-gobject-devel
RUN python3 -m pip install -r requirements.txt
RUN python3 -m pip install GDAL==$(gdal-config --version)
# Set work directory




# Add Entrypoint
COPY script/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]