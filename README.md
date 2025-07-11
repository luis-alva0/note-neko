Simple e-commerce style web built for a university project using Javascript, EJS, Docker, Mongo and Express.

### **_Docker commands:_**

Development mode
```bash
# Build and start the containers
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

Production mode
```bash
# Build the production image
docker build -t crud-test-app .

# Run with MongoDB
docker-compose -f docker-compose.yml up -d
```

Useful Docker commands
```bash
# View running containers
docker ps

# View logs of a specific container
docker-compose logs app
docker-compose logs mongo

# Access the MongoDB shell
docker-compose exec mongo mongosh

# Access the Node.js container shell
docker-compose exec app sh

# Stop and remove containers, networks, and volumes
docker-compose down -v
```

If you already have a MongoDB service running first stop it, or change the port
```bash
# On Windows
net stop MongoDB
   
# On macOS/Linux
sudo systemctl stop mongod
```
