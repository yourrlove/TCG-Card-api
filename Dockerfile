FROM node:23-alpine

WORKDIR /tcg-api

COPY package*.json ./

RUN npm install

# Change ownership before copying files
RUN chown -R node:node /tcg-api

# Switch to non-root user
USER node

# Copy remaining files
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]