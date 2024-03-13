FROM node:latest
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm i
COPY . ./
CMD ["npm start"]