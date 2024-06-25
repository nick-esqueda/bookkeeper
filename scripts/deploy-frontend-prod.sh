#!/bin/bash

# RUN THIS SCRIPT FROM THE PROJECT ROOT DIRECTORY.

if [ -f scripts/.env ]; then
  source scripts/.env
else 
  echo "ERROR: .env file must exist in the ./scripts/ directory. Aborting script."
  echo "(make sure you run this script from the project root)"
  exit 1
fi

LOGDIR="$(pwd)/scripts/logs/deploy-frontend-prod"
mkdir -p "$LOGDIR"

DATETIME=$(date +"%Y-%m-%dT%H.%M.%S-%Z")
LOGFILE="$LOGDIR/$DATETIME.log"

echo "saving logs to $LOGFILE..."

cd frontend/

{
  echo "starting react build..."

  npm run build:prod

  echo "deploying static files to S3..."

  aws s3 sync ./build/ $PROD_S3_BUCKET_URI \
  --profile $AWS_PROFILE

  echo "refreshing CloudFront cache..."

  aws cloudfront create-invalidation \
  --distribution-id $PROD_CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*" \
  --profile $AWS_PROFILE

  echo 'script completed. some AWS processes may still be running.'

} 2>&1 | tee -a $LOGFILE

cd ..

