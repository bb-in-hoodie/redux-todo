# build client
FROM node:16-alpine AS build
WORKDIR /client

# install dependencies
COPY ../package*.json .
RUN ["npm", "install"]

# build frontend
COPY .. .
RUN ["npm", "run", "build"]

# serve client using nginx
FROM nginx:1.22.0-alpine
COPY --from=build /client/build /usr/share/nginx/html
COPY --from=build /client/deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80