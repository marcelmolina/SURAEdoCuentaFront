FROM node:14.16.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .
#COPY package.*json ./

RUN npm install && \
    npm run build && \
    ls -la && \
    pwd &&\
    ls -la /app/dist

#RUN yarn build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/estadoCuenta /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html/

#COPY ./nginx/nginx-dev.conf /etc/nginx/conf.d/default.conf

#EXPOSE 3000

CMD ["nginx","-g","daemon off;"]
