FROM node:14

RUN mkdir -p src/node/app

WORKDIR /src/node/app

COPY package.json yarn.* ./

RUN yarn

COPY . .

EXPOSE 5000

ENTRYPOINT [ "./init.sh" ]