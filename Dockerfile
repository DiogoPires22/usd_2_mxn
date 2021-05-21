FROM node:14.15.5-alpine As development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM node:14.15.5-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY start.sh ./

RUN yarn install --production

COPY . .

COPY --from=development /app/dist ./dist

ENV PATH /app/node_modules/.bin:$PATH

CMD [ "sh","./start.sh" ]