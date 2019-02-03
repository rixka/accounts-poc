# Accounts MVP

This is a NodeJS application which interfaces with MongoDB to read and update a collection in that database. Ideallistically the ExpressJS app would be deployed using Docker Swarm or Kubernetes (not currently setup).

[![Build Status](https://travis-ci.org/rixka/accounts-poc.svg?branch=master)](https://travis-ci.org/rixka/accounts-poc)

#### Dependencies

_Note: This project assumes **npm** are installed locally._

To install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) please review the appropriate documentation.


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
* GET `/accounts`
	* Returns a list of accounts
* GET `/accounts/{id}`
        * Takes in parameter a "id" and returns the account
* POST `/accounts`
	* Takes in parameter a "email" 
	* This call creates a new account
* PUT `/accounts/{id}`
	* Takes in parameter a "id" and updates the account
* DELETE `/accounts/{id}`
	* Takes in parameter a "id" and deletes the account

### MongoDB Database with Docker
For the purpose of this exercise, I’m going to be using docker in order to quickly get a mongodb instance up and running on my local development machine.

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
