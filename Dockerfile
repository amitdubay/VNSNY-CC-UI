
FROM public.ecr.aws/e4f8f6h7/node-lts-alpine3.13:latest as build 

WORKDIR /usr/local/app 

COPY ./ /usr/local/app/ 

RUN npm install 

RUN /usr/local/app//node_modules/.bin/ng build  



FROM public.ecr.aws/e4f8f6h7/nginx-stable-alpine-perl:latest 
 
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf 

COPY ./nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /usr/local/app/dist/vnsny-command-center /usr/share/nginx/html

EXPOSE 80 

  