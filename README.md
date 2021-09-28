# Alien-Language-Parser
Node backend to store, read and process intercepted messages from the aliens.

1. To run the project, first you have to build the images of the two directories. Use `docker build -t valienta` inside [db](./db) and `docker build -t db_migration` in [api](./api) to build the images of the API and the Database migration.

2. You can also create an image that allows you to use hot reload while making changes in the API like you would if you run the project in your local machine with `docker build -f "api/Dockerfile.dev" -t valienta.dev:0.1`

3. To run everything, use `docker compose up`.If you don't want to use the development image of the API, change the name of the image from 'valienta.dev' to 'valienta' or the name that you choose.
