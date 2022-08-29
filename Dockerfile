FROM node:18.7.0

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD npm run start