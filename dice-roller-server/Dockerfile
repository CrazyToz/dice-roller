FROM openjdk:14-alpine
COPY target/dice-roller-server-*.jar dice-roller-server.jar
EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "dice-roller-server.jar"]