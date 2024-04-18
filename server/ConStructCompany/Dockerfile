# syntax=docker/dockerfile:1
FROM openjdk:23-oraclelinux8

WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
CMD [ "./mvnw","springboot:run" ]

