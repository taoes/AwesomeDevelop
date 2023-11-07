FROM node:16 AS build
WORKDIR /app
COPY . .
RUN yarn && yarn docs:build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .