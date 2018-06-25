# bookmark-cloud
Bookmark Cloud is an open source absolutely free project for storing your bookmarks into cloud. Developing and supporting by IBA Group

## Requirements

1. Java - 1.8.x

2. Maven - 3.x.x

3. Mysql - 5.x.x

4. Spring Framework - 2.x.x

5. Bootstrap - 4.x.x

## Steps to Setup

**1. Clone the application**

```bash
git clone https://github.com/mrcracken/bookmark-cloud
```
**2. Download Mysql Workbanch and install it**
https://www.mysql.com/downloads/

**3. Create Mysql database**
```bash
create database demo
use demo
```

**4. Change mysql username and password as per your installation**

+ open `src/main/resources/application.properties`

+ change `spring.datasource.username` and `spring.datasource.password` as per your mysql installation

**5. Build and run the app using maven**
In Eclipse IDE
```bash
Run -> Run Configyrations -> Maven
```
In Goals write
```bash
spring-boot:run
```

The app will start running at <http://localhost:8080/>

## Explore Rest APIs

The app defines following CRUD APIs.

    GET /api/notes

    POST /api/notes

    GET /api/notes/{noteId}

    PUT /api/notes/{noteId}

    DELETE /api/notes/{noteId}

    POST /api/notes/create/{whose}

    GET /api/notes/select/{whose}

    GET /api/users

    POST /api/users

    GET /api/users/{id}

    PUT /api/users/{id}

    DELETE /api/users/{id}

    GET /api/users/select/{username}

    DELETE /api/users/admin/{id}

You can test them using Postman or any other rest client.

**6. Stop application**
Visit the url for details
https://stackoverflow.com/questions/40118878/8080-port-already-taken-issue-when-trying-to-redeploy-project-from-spring-tool-s

Also for updating Javascript code visit
https://stackoverflow.com/questions/27037989/intellij-idea-12-1-7-javascript-file-not-updating-when-application-runs
