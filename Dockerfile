# base image
FROM node:8.9.3

# install and cache app dependencies
RUN npm install --silent

# start app
CMD ["npm", "start"]