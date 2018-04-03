#!/usr/bin/env bash

KEY_PATH=~/Dropbox/AWS/keys/ec2-1.pem
EC2_USER=ec2-user
REMOTE_HOST=ec2
TAR_NAME=kozlovcoin-wallet.tar.gz

npm run build:prod
tar -czf $TAR_NAME -C dist .
scp -i $KEY_PATH $TAR_NAME $EC2_USER@$REMOTE_HOST:~/thohoh.pro/$TAR_NAME
rm -rf ./$TAR_NAME

ssh -i $KEY_PATH $EC2_USER@$REMOTE_HOST << 'ENDSSH'
cd thohoh.pro
rm -rf wallet_public
mkdir wallet_public
tar -xvf kozlovcoin-wallet.tar.gz -C wallet_public
rm kozlovcoin-wallet.tar.gz
exit
