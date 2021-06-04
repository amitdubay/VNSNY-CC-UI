#!/bin/bash

echo "Running build steps"

npm install 

/usr/local/app//node_modules/.bin/ng build  

echo "Build complete"