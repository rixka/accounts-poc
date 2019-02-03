FROM mvertes/alpine-mongo

RUN apk add --no-cache mongodb-tools

COPY accounts.json /accounts.json
CMD mongoimport --host mongodb --db development --collection accounts --type json --file /accounts.json --jsonArray
