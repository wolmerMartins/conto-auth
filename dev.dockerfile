FROM node:20.11-alpine AS base_image

FROM base_image AS dependencies

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm i

FROM base_image AS app

EXPOSE 3000

WORKDIR /app

COPY --from=dependencies /app/node_modules /app/node_modules

COPY . /app

CMD [ "npm", "run", "dev" ]
