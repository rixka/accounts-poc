FROM mhart/alpine-node:11.9

WORKDIR /app

COPY package*.json /app/
COPY tsconfig.json /app/

RUN npm install -g typescript
RUN npm install --quiet

COPY ./src /app/src
RUN tsc

CMD [ "npm", "start" ]
