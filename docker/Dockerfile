FROM node:12.22-alpine

USER node

COPY . /opt/app/
USER root
WORKDIR /opt/app/

CMD ["npm", "run", "start"]