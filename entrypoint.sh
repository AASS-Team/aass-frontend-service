#!/bin/sh
set -e

# Install dependencies
npm clean-install

export NODE_PATH=/aass-frontend-service/node_modules:$NODE_PATH

echo $NODE_PATH

# Run the main command
exec "$@"