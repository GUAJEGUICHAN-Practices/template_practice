FROM node:18.7.0

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

WORKDIR /app/frontend
RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm i -f && npm audit fix
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD npm run start