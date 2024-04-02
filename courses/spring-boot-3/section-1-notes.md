
# Section 1

Spring is hard. **Spring Boot** makes things easier by:
- minimizing manual config by auto-configing based on props in files and jar classpath
- helps resolve dependency conflicts (Maven / Gradle)
- provide embedded HTTP server
- uses spring behind the scenes
- spring initializr quick start project

Embedded Server
- Tomcat/jetty.utc
- Jar = app code & embedded server --> self contained unit, nothing you need to install.
- Can run apps standalone bc of build in server
- `java -jar mycoolapp.jar` <- should run project

Deploying
- can deploy traditionally
- WAR files to an external server (Web Application Archive)

Spring Boot FAQ:
- Does it replace spring MVC? No its uses them in the background.
- Does it run faster than regular Spring code? No, its the same. 