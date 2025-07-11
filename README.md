# CRUD API

A simple CRUD (Create, Read, Update, Delete) API built with Node.js, Express.js, and PostgreSQL, containerized with Docker for easy development and deployment.

## 🚀 Features

- **RESTful API** with Express.js
- **PostgreSQL** database integration
- **Docker** containerization for development and production
- **Hot reload** in development mode
- **Error handling** middleware
- **CORS** enabled
- **Input validation** with Joi
- **Environment-based configuration**

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (if running locally without Docker)
- [PostgreSQL](https://www.postgresql.org/) (if running locally without Docker)

## 🛠️ Project Structure
```bash
crud-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── data/
│   │   ├── createUserTable.js
│   │   └── data.sql
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── index.js
├── docker-compose.yml
├── docker-compose.dev.yml
├── Dockerfile
├── Dockerfile.dev
├── package.json
└── README.md
```
## 🐳 Docker Quick Start

### Development Environment

```bash
# Clone the repository
git clone <your-repo-url>
cd crud-api

# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Stop the development environment
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes (clean database)
docker-compose -f docker-compose.dev.yml down -v
```

### Production Environment

```bash
# Start production environment
docker-compose up --build -d

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f

# Stop and remove volumes
docker-compose down -v
```

## 🔧 Environment Configuration

The application uses environment variables for configuration:

### Development Environment Variables

- `NODE_ENV=development`
- `PORT=5001`
- `USER=postgres`
- `HOST=postgres`
- `DATABASE=express_crud`
- `DBPORT=5432`
- `PASSWORD=apiuserPW!`

### Production Environment Variables

Update the `NODE_ENV` to `production` in `docker-compose.yml` for production deployment.

## 🐋 Essential Docker Commands

### Basic Docker Commands

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container_name>

# Remove a container
docker rm <container_name>

# List images
docker images

# Remove an image
docker rmi <image_name>

# View container logs
docker logs <container_name>

# Execute commands in running container
docker exec -it <container_name> bash
```

### Docker Compose Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View service logs
docker-compose logs <service_name>

# Follow logs in real-time
docker-compose logs -f

# Scale a service
docker-compose up --scale <service_name>=3

# Restart a service
docker-compose restart <service_name>
```

### Database Management

```bash
# Access PostgreSQL container
docker exec -it postgre-db-dev psql -U postgres -d express_crud

# Backup database
docker exec postgre-db-dev pg_dump -U postgres express_crud > backup.sql

# Restore database
docker exec -i postgre-db-dev psql -U postgres -d express_crud < backup.sql
```

## 📡 API Endpoints

### Base URL

- Development: `http://localhost:5001`
- Production: `http://localhost:5001`

### Available Endpoints

#### Health Check

```http
GET /
```

Returns database connection status and current time.

#### User Management

```http
GET /api/users          # Get all users
GET /api/users/:id      # Get user by ID
POST /api/users         # Create new user
PUT /api/users/:id      # Update user
DELETE /api/users/:id   # Delete user
```

### Example API Usage

#### Create User

```bash
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get All Users

```bash
curl http://localhost:5001/api/users
```

#### Get User by ID

```bash
curl http://localhost:5001/api/users/1
```

#### Update User

```bash
curl -X PUT http://localhost:5001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "johnsmith@example.com"}'
```

#### Delete User

```bash
curl -X DELETE http://localhost:5001/api/users/1
```

## 🚀 Local Development (Without Docker)

If you prefer to run without Docker:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start PostgreSQL locally and create database
createdb express_crud

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Find process using port 5001
   lsof -i :5001
   
   # Kill the process
   kill -9 <PID>
   ```

2. **Database connection failed**
   - Ensure PostgreSQL container is running
   - Check environment variables
   - Verify database credentials

3. **Permission denied errors**

   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Container won't start**

   ```bash
   # Check logs
   docker-compose logs <service_name>
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Useful Debug Commands

```bash
# Check container status
docker-compose ps

# Access application container
docker exec -it express-app-dev bash

# Access database container
docker exec -it postgre-db-dev psql -U postgres

# Check database tables
docker exec -it postgre-db-dev psql -U postgres -d express_crud -c "\dt"
```

## 📚 Learning Docker

### Key Concepts

- **Container**: Lightweight, standalone package with everything needed to run an application
- **Image**: Blueprint for containers
- **Volume**: Persistent storage for containers
- **Network**: Communication between containers
- **Docker Compose**: Tool for defining multi-container applications

### Best Practices

1. Use `.dockerignore` to exclude unnecessary files
2. Use multi-stage builds for production
3. Don't run containers as root
4. Keep images small and focused
5. Use environment variables for configuration
6. Implement health checks
7. Use volumes for persistent data

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Review Docker logs: `docker-compose logs -f`
3. Open an issue on GitHub
