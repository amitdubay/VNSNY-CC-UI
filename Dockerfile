
FROM node:lts-alpine3.13 as build 

ARG env

WORKDIR /usr/local/app 

COPY ./ /usr/local/app/ 

# SHELL ["/bin/sh", "-c"] 
RUN npm install -g @angular/cli

RUN npm install 

RUN ng build ----configuration=${env}

RUN echo ${env}

FROM nginx:stable-alpine-perl
 
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf 

COPY ./nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /usr/local/app/dist/vnsny-command-center /usr/share/nginx/html

EXPOSE 80 

  