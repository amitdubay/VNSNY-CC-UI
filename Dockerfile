
FROM node:lts-alpine3.13 as build 

WORKDIR /usr/local/app 

COPY ./ /usr/local/app/ 

# SHELL ["/bin/sh", "-c"] 

RUN npm install 

RUN /usr/local/app//node_modules/.bin/ng build  



FROM nginx:stable-alpine-perl
 
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf 

COPY ./nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /usr/local/app/dist/vnsny-command-center /usr/share/nginx/html

EXPOSE 80 

  