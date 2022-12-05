FROM openjdk:latest

COPY build/libs/*.jar home/usr/application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/home/usr/application.jar"]