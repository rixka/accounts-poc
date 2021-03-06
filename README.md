# Accounts MVP

This is a NodeJS application which interfaces with MongoDB to read and update a collection in that database. Ideallistically the ExpressJS app would be deployed using Docker Swarm or Kubernetes (not currently setup).

[![Build Status](https://travis-ci.org/rixka/accounts-poc.svg?branch=master)](https://travis-ci.org/rixka/accounts-poc)

#### Dependencies

_Note: This project assumes **npm**, **docker**, and **docker-compose** are installed locally._

To install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Docker](https://docs.docker.com/install) and [Docker Compose](https://docs.docker.com/compose/install/) please review the appropriate documentation.


### Task List
* Greengrass development project, concept -> deployment
* NodeJS development for applications and scripting
* RESTful API development
* Continuous Delivery and Continuous Integration
* Building and updating deployment pipelines
* Investigate docker or serverless solutions


### Requirements Specification
* Use nodeJS with ExpressJS
* Create a small CRUD service with Rest API and Simple UI
* Test Driven Development
* Include backend validation
* Follow the KISS principle
* Provide all instructions for an easy setup
* Consider scalability for production readiness: expect number of user accounts to grow and spike unexpectedly.
* Deploy demo in the cloud


### API Considerations
* GET `/api/accounts`
	* Returns a list of accounts
* GET `/api/accounts/:id`
	* Takes in parameter a "id" and returns the account 
* POST `/api/accounts`
	* Takes in parameter a "email" 
	* This call creates a new account
* PUT `/api/accounts/:id`
	* Takes in parameter a "id" and updates the account
* DELETE `/api/accounts/:id`
	* Takes in parameter a "id" and deletes the account

### MongoDB Database with Docker
For the purpose of this exercise, I’m going to be using docker in order to quickly get a mongodb instance up and running on my local development machine.
This is useful if intending to work on the application locally without running the whole setup in docker. 

```shell
npm run mongo:up
npm run mongo:logs

# Kill with fire
npm mongo:down
```

Or if preferred:
```shell
docker-compose -f docker-compose-mongo-only.yml build
docker-compose -f docker-compose-mongo-only.yml up --force-recreate -d

# Kill with fire
docker-compose -f docker-compose-mongo-only.yml down
```

### Quick Start with Docker
To setup a dockerised MongoDB and Application system run `npm run docker:up` and navigate to `http://localhost:3000/`.
If you would like to view the docker logs you can run `npm run docker:logs`.

```shell
npm run docker:up
npm run docker:logs

# Kill with fire
npm docker:down
```

Or if preferred:
```shell
docker-compose build
docker-compose up

# Kill with fire
docker-compose down
```

Once the App container is running you can curl requests or navigate with the browser `http://localhost:3000/`.

#### API Example - curl
```
# health check
curl -v http://localhost:3000/api/health

# list accounts
curl -v http://localhost:3000/api/accounts
```

### Quick testing
```shell
npm test
```

### Quick cleaning with Docker
```shell
docker rm `docker ps -aq`
docker volume rm `docker volume ls -q -f dangling=true`
docker rmi `docker images --filter "dangling=true" -q --no-trunc`
```

_Note: More information available [here](https://gist.github.com/bastman/5b57ddb3c11942094f8d0a97d461b430)._

## Future Work

**Warning:** Not fit for production, more work required.

* **LOGGING!!!!!!**
* **LOGGING!!!!!!**
* And more **logging** - possibly look into integrating sentry.
* OAuth 2.0 or any authentication.
* Error handling on front end to infom the user any errors.
* GraphQL.
* Add possibility to paginate accounts.
* Redis.
* Build and push api image to a docker registry for production use.
* Appropriate API documentation (i.e Swagger).
* More meaningful Error messages (i.e Bad Request - invalid parameter).
* Unit tests with mocks bypassing Express and MongoDB.
* Breakdown the code into more modular components.
* The tests should continue to grow (coverage is ~70%), separating them out may become necessary.
* Any basic front end tests.

_Note: Feedback welcomed._
