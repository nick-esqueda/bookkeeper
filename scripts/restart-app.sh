#!/bin/bash

set -e

# Run the DB backup script
~/backup-mysql-to-s3.sh

# Shut the app down
docker-compose -f compose-prod.yaml --env-file .env.production down

# Remove all images so that Docker pulls the latest ECR image on startup
docker rmi $(docker images -aq)

# Start the app
docker-compose -f compose-prod.yaml --env-file .env.production up -d

