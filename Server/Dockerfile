# using multistage docker build
# ref: https://docs.docker.com/develop/develop-images/multistage-build/
# Temp container to build using gradle

# Every FROM Creates a new build
FROM gradle:latest AS TEMP_BUILD_IMAGE
# Change Working Directory from where commands are executed
WORKDIR /usr/app/
# Copy Files
COPY build.gradle settings.gradle /usr/app/  
COPY gradle /usr/app/gradle

COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src 
RUN gradle clean build
    
# actual container
FROM adoptopenjdk/openjdk11:alpine-jre
WORKDIR /usr/app/
COPY --from=TEMP_BUILD_IMAGE /usr/app/build/libs/oopsie-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT exec java -jar oopsie-0.0.1-SNAPSHOT.jar