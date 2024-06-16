#!/bin/bash

# Exit script if any command fails
set -e

# Load environment variables
export $(grep -v '^#' .env.production | xargs)

# Variables
TIMESTAMP=$(date +"%F")
BACKUP_DIR="/mnt/ebs-volume/db-backups"
BACKUP_NAME="$DB_NAME-$TIMESTAMP.sql"
TEMP_BACKUP_NAME="/tmp/$BACKUP_NAME"

# Create the backup directory if it doesn't exist
sudo mkdir -p $BACKUP_DIR

# Run the mysqldump command inside the Docker container
echo 'starting mysqldump...'
docker exec -i ec2-user-db-1 /usr/bin/mysqldump -u root -p$DB_ROOT_PASSWORD $DB_NAME > $TEMP_BACKUP_NAME

# Move the backup to proper directory with sudo
sudo mv $TEMP_BACKUP_NAME $BACKUP_DIR/$BACKUP_NAME

# NOTE: `aws s3 cp` causes t2.micro to crash, therefore commenting out.
# Upload the backup to S3
# echo 'starting S3 upload...'
# aws s3 cp $BACKUP_DIR/$BACKUP_NAME s3://$DB_BACKUP_S3_BUCKET/backup/$BACKUP_NAME

# Remove old backups locally
sudo find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
echo 'removed backups older than 7 days'

