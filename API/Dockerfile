FROM node
WORKDIR /home/node/API


COPY package.json /home/node/API/
COPY package-lock.json /home/node/API/


RUN npm install
CMD ["npm", "start"]