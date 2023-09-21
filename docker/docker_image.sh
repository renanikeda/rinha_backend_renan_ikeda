#!/bin/bash
cd ../dist
docker build --network host -t rinha_backend_renan_ikeda -f ../docker/Dockerfile .