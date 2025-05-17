# Post Service

Post Service is a microservice built with NestJS, Docker, Prisma, PostgreSQL, and MongoDB. It offers RESTful APIs to manage posts, comments, likes, and user posts in an event-driven architecture.

## Features

- Create, retrieve, and delete posts
- Add comments to posts (comments are posts with a `parent_id` reference)
- Like posts
- Fetch user-specific posts
- REST API support (GraphQL and SQS support coming soon)

## Tech Stack

- Node.js 20+
- NestJS
- Docker
- Prisma ORM
- PostgreSQL (primary database)
- MongoDB (used for certain collections)
- REST API

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (preferred), npm or yarn
- Docker and Docker Compose
- PostgreSQL and MongoDB instances running

### Installation

```bash
git clone https://github.com/iamArvy/post-service.git
cd post-service
pnpm install
```
### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_DB_URL="your_mongodb_connection_string"
POSTGRES_DB_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_for_authentication_ensure_it's_the_same_from_auth_service"
PORT=3000
```
### Running with Docker

Make sure your `.env` is configured with database connection strings.

```bash
docker-compose up --build
```

### Running Locally

```bash
pnpm run start:dev
```

### API Documentation

Visit `http://localhost:3000/api` to view Swagger API documentation.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.