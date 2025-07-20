#!/bin/bash
# Installe Gatekeeper si non présent
if ! kubectl get ns gatekeeper-system; then
  kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml
  sleep 10 # Attente du déploiement
fi
