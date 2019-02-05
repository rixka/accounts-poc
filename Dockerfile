FROM mhart/alpine-node:11.9

WORKDIR /app
RUN mkdir /app/client

COPY package*.json /app/
COPY tsconfig.json /app/
COPY ./client/package*.json /app/client/
COPY ./client/tsconfig.json /app/client/

RUN npm install -g typescript
RUN npm install --quiet

COPY . /app/
RUN npm run build

CMD [ "npm", "start" ]
