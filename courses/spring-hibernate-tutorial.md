[Course](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/36829930#overview)

## Overview
### Spring Boot
- Why use? Minimized manual config, embedded HTTP server to get started quickly
	- Jar file with have code and server code (you won't need to install server separately)
- Spring vs Spring Boot vs Spring MVC vs Spring REST
	- Sprint Boot uses [Spring Framework](https://docs.spring.io/spring-framework/reference/) in the background. Boot is about simplifying configuration.
- https://start.spring.io/ <-- make a starter project
- Deploying
	- Deploy WAR (Web Application Archive) file to an external server <-- doesn't need tomcat server bc external server will handle
- Running
	- From IDE
	- CLI
		- Spring Boot apps are self contained with a server out of the box
		- Use Java: `java -jar $jar_file.jar`
		- Maven plugin: `./mvnw package && ./mvnw spring-boot:run`
			- package = creates a jar file
		- Maven (if you have maven installed): `mvn package && mvn spring-boot:run`
### Maven
- A project management tool which downloads JAR files for those projects and makes them available during compile / run
	- Without Maven: Developer goes to each website to get the apache, json, etc JAR files
	- With: Maven downloads them from the internet and makes them available. It also downloads supporting deps and builds up the class / build path. 
		- Checks a local repo (cache), if not there, fetches from internet and build cache. Then uses cache to build and run deps. 
- Directory structure
	- All source code under `src/main/java`
	- Properties config under `src/main/resources`
	- Web app code does under `src/main/webapp`
		- **DO NOT USE IF APP IS PKG'D AS A JAR**
- `pom.xml`
	- Project Object Model file
	- Always in root
	- Metadata
		- Name, output type, version
	- Dependencies
		- projects we need to run project
		- Add new dependencies here, include Group ID, Artifact ID and Version
		- Go maven repo and find dep coordinates
	- Plugins
		- custom tasks 
- `mvnw` = maven wrapper files will download correct maven vs for you. 

### App Properties
- SB will load properties from `application.properties` <-- created by spring init, can add a specific port (ex: `server.port=8585`) or any other properties you'd like
	- To read the data by using injection `@Value($server.port)`above the class or a var: `private String portName;`
	- There are 1k standard properties
- Static content directory (html, imgs, css, etc) <-- spring loads automatically
- Templates (Thymeleaf, Mustache, etc)
- Unit tests 
- 

### Spring Boot Starters
- Common question is what are minimum deps to get started --> use Spring Boot Starters in your dependencies --> curated list of Maven deps that have been tested by Spring Dev team imported with one dependency declaration.
```xml
<dependency> 
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency> 
```
- Spring Boot Starter Parent <-- special Maven defaults like compliler, UTF encoding. You can override the default by specifying java version. 
	- Dependencies will inherit from starter which ensures all deps are compatible. 
-  `spring-boot-devtools` add to POM <-- prevent us from having to restart the server every time we make a change. 
- Actuator --> get DevOps functionality out of the box `	<artifactId>spring-boot-starter-actuator</artifactId>`
	- Adds endpoints without setting them up
	- `actuator/health ` --> checks status of app (up/down) and can add other biz logic, exposed by default, can define others to expose
	- 10+ endpoints are available (/beans, /mappings etc)
	- Needs security in place to not expose to web.
- Security
	- `<artifactId>spring-boot-starter-actuator</artifactId>` 
		- Will prompt for a login once attempting to get health info. Will spit out a password when starting server.
		- If you want to override, define in the `application.properties` file:
``` 
spring.security.user.name=me
spring.security.user.password=us
```

## Spring Core
### Inversion of Control
- Spring container acts as an object factory
	- creates and manages object (inversion of control)
	- Injects object dependencies (dependency injection)
	- Configure with XML config, annotations, source code. 
### Dependency Injection
The client delegates to another object the responsibility of providing its dependencies.
- DI = give me an object and assemble it, then give it to me. 
Injection Types
- **Constructor Injection**
	- Use when you have require deps and is usually the first choice
	- Behind the scenes: creates a new instance of the coach and pass the coach into the controller. <-- seems simple, why use? <-- use Spring for enterprise apps and provides A LOT out of the box beyond DI / IoC.
- **Setter Injection**
	- When there are optional deps (if dep not provided, app can give fallback)
	- Inject by calling setter methods on your class
- **Field Injection** (not recommended) <-- makes its difficult to test
	- Inject dependencies by setting field values directly using Java Reflection
```
@Autowired
private Coach myCoach;
```
Spring Autowiring
- `@Autowired` = tell Spring to for class that matches type or interface and inject it.
	- note: if there is only 1 constructor, you can omit. 
- Spring scans for `@Components` annotations and sees if anyone implements X interface
	- `@Components` makes the class a [Spring Bean](https://www.baeldung.com/spring-bean) = Java class manages by Spring and makes it available for DI by registering the the Spring Container
	- `@ComponentScan` Enable component scan of current pkgs and recursively scans sub pkgs
		- Will only scan component of a SpringBoot app class and what is underneath or sister to that that BUT you can provide explicit list of the base pkgs to scan
```java
@SpringBootApplication(
	scanBasePackages=(
	"com.luv2code.springcoredemo",
	"com.luv2code.utils"
	...
	))
public class MycoolappApplication {  
    public static void main(String[] args) {  
       SpringApplication.run(MycoolappApplication.class, args);  
    }  
  
}
```
	- `@EnableAutConfiguration` Enables Spring Boot Auto config support
- Sometimes IDE will mark classes as no used because the IDE isn't aware of how the class is used as runtime
Annotation Autowiring and Qualifiers
- Construction Injection:
	- What if there are many implementations of Coach (Our Interface)?
	- Use `@Qualifier`. Provide the bean id (class but first character is lowercase)
```java
@Autowired  
public FunRestController((@Qualifier("cricketCoach") Coach theCoach) {  
    myCoach = theCoach;  
}
```
- Can do the same thing with setter injection.
- What if it doesn't matter which coach you need? Use `@Primary` <-- can only be 1 primary. If you mix `@Qualifier` and `@Primary`, `@Qualifier` takes precedence, therefore you should use it instead.
Lazy Initialization
- `@Lazy` Bean only init when used for DI or explicitly injected, if not needed, not created.
- To initialize across all beans globally add `spring.main.lazy-initialization=true` to config file
- Use caution when using
- Adv
	- Only created objs as needed
	- Can help w/fast startup if project is large
- Disadv
	- @RestController is not created until requested
	- Won't discover config until late
	- Need to make sure you have enough memory 
Bean Scopes
- Default = Singleton: creates one instance and caches in memory. All DIs reference the same bean and shares among items.
```java
@Autowired  
// both theCoach and anotherCoach point to the same instace of cricketCoach by default
public FunRestController(@Qualifier("cricketCoach") Coach theCoach,  
                         @Qualifier("cricketCoach") Coach anotherCoach) {  
    myCoach = theCoach;  
}
```
- Can define the scope manually
	- singleton: share single instance of a bean
	- prototype: new bean instance for each container request / injection `@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)`
		- Note: Spring does not manage the complete lifecycle of a prototype bean. The client code must clean up prototype-scoped objects and release expensive resources that the prototype bean(s) are holding.
	- request: scope to http web request
	- session: scope to http web session
	- application: scope to http [ServerletContext](https://docs.oracle.com/javaee/6/api/javax/servlet/ServletContext.html)
	- websocket: scope to a [web socket](https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,as%20RFC%206455%20in%202011.)
Bean Lifecycle 
- container starts --> bean instantiated --> DI --> internal spring processing --> custom method inits --> bean ready to be used --> custom destroy --> stop app
- Methods & Hooks
	- Init (`@PostConstruct)
	- destroy (`@PreDestroy)
		- for Prototype beans, spring doesn't call destroy
Configure Beans with Java Code
- Create `@Configuration` class
- Define `@Bean` method to configure the bean --> why not just use `@Component?`--> Make existing 3rd party class available to spring framework as a spring bean.
	- ex: using AWS S3 and want to use S3 client in our code. We cannot modify the source code however. 
```java
// make s3 bean
@Bean
public S3Client remoteClient() {
	.... set up some stuff ....
	return s3Client
}

// then inject bean into service
@Component 
public class DocumentService {
	private S3Client s3Client;
	
	@Autowired
	public DocumentService(S3Client thes3Client) {
	s3Client = theS3Client
	}
}
```
- Inject into a service
## REST CRUD APIs
### REST
- REST = Representational State Transfer (way to comm btwn apps)
	- Language agnostic
	- Data forma = any (json or xml)
	- REST API = REST Web Services = RESTful services = all same thing. 
- ex:  client app to provide weather report for a city 
	- weatherApp <--- REST api calls over http city / report ---> weatherService(external)
- [HTTP](https://en.wikipedia.org/wiki/HTTP)
	- CRUD Operations
		- POST = Create a new entity
		- GET = Read a list or single entity
		- PUT = Update entity
		- Delete = Delete existing entity
	- Status
		- 100-199 info
		- 200-299 successful
		- 300-399 redirect
		- 400-499 client error
		- 500-599 server error
	- MIME content type
		- Multipurpose Internet Mail-Extension = format of message
			- `type/html` or `text/plain`
			- `application/json` or `application/xml`
Java JSON Data Binding (Serialization/Marshalling/Mapping)
- Convert JSON data to a [Java POJO](https://www.baeldung.com/java-pojo-class)or vice versa
- Using Jackson <--Spring uses behind the scenes
	- will call getter/setter by default (setXXX), it does not access private fields directly.
	- JSON passed to REST controller is converted to Java POGO w/Jackson out of the box
Path Variables
- `/api/students/{studentId}` 
- use `@PathVariable`
```java
@GetMapping("/students/{studentId}")  
public Student getStudent(@PathVariable int studentId) {  
    List<Student> students = new ArrayList<>();  
    students.add(new Student("John", "Doe"));  
    students.add(new Student("Jane", "Doe"));  
    return students.get(studentId);  
}
```
