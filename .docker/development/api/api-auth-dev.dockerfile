FROM node:lts-alpine
LABEL Éverton Carvalho <evertonsnake@gmail.com>

ENV NODE_ENV=development
ENV TZ=America/Sao_Paulo
WORKDIR /home/node/app

COPY . .

RUN apk --no-cache add --update tzdata \
    && echo ${TZ} > /etc/timezone \
    && rm -rf /var/cache/apk/*

RUN npm install -g @nestjs/cli

RUN npm install

# RUN npm run build

EXPOSE 3000

USER node

CMD [ "npm", "run", "start:dev" ]
