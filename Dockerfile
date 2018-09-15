FROM node:8.6 AS build
WORKDIR /app
COPY ./ /app
RUN npm run build

FROM node:8.6-alpine
COPY --from=build /app /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start"]
