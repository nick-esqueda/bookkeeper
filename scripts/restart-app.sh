#!/bin/bash

set -e

HOME_DIR="/home/ec2-user"

# Run the DB backup script
$HOME_DIR/backup-mysql-to-s3.sh

# Shut the app down
docker-compose -f $HOME_DIR/compose-prod.yaml --env-file $HOME_DIR/.env.production down

# Remove all images so that Docker pulls the latest ECR image on startup
docker rmi $(docker images -aq)

# Start the app
docker-compose -f $HOME_DIR/compose-prod.yaml --env-file $HOME_DIR/.env.production up -d

