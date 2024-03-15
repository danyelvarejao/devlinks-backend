FROM node:20.11-alpine3.18

WORKDIR /backend

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build
RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]
