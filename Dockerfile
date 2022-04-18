FROM node:lts-alpine

# set work directory
WORKDIR /aass-frontend-service

# install npm dependencies
COPY package*.json ./

# install project dependencies
RUN npm install
