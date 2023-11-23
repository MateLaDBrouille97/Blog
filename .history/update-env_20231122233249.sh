#!/bin/bash

echo "DATABASE_URL=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "NEXT_PUBLIC_API_URL=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "DIRECT_URL=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "UPLOADTHING_APP_ID=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "PRISMA_BINARY_TARGET=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "MUX_TOKEN_ID=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production
echo "MUX_TOKEN_SECRET=$(aws ssm get-parameter --name '/path/to/parameter' --with-decryption | jq -r '.Parameter.Value')" >> .env.production