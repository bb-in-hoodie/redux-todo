# build server
FROM node:16-alpine AS build
WORKDIR /server

# install dependencies
COPY ../package*.json .
RUN ["npm", "install"]

# copy the rest
COPY .. .

# run express
ARG MONGODB_URL
ENV MONGODB_URL=$MONGODB_URL
CMD ["npm", "run", "ts-start"]
EXPOSE 3000
