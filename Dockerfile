FROM node:9-alpine

ADD package.json /tmp/package.json
ENV NODE_ENV production
RUN cd /tmp && npm install --production
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

RUN addgroup -S nodejs && adduser -S -g nodejs nodejs
USER nodejs

EXPOSE 8081

CMD ["node", "app.js"]
