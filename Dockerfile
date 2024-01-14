FROM node:lts-alpine

# set work directory
WORKDIR /aass-frontend-service

# install npm dependencies
COPY package*.json ./

# copy entrypoint
COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

CMD ["entrypoint.sh", "npm","run","serve"]
