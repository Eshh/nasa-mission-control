FROM node:lts-alpine

WORKDIR /app
#root
COPY package.json ./
RUN npm run root-install

# client react
COPY client/package.json client/
RUN npm run install-client --omit=dev

#server node
COPY server/package.json server/
RUN npm run install-server --omit=dev

#source code copy
COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm","start","--prefix","server"]

EXPOSE 8000