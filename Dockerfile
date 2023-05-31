FROM node:19.1.0-bullseye-slim
RUN apt-get update
COPY ./ ./app
WORKDIR /app
RUN npm install
CMD [ "npm","run","test" ]