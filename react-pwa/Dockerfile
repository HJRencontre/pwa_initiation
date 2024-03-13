FROM node:latest
WORKDIR /app/react-pwa
ENV PATH /app/react-pwa/node_modules/.bin:$PATH
ENV PORT 3001
COPY package*.json ./
RUN npm i
COPY . ./
CMD ["npm", "start"]