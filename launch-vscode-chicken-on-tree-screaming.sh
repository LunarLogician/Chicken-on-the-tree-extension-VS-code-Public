#!/bin/bash
# Launch VS Code with the Chicken On Tree Screaming Extension for development/testing

EXTENSION_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Launching VS Code with Chicken On Tree Screaming Extension..."
echo "Extension directory: $EXTENSION_DIR"

code --extensionDevelopmentPath="$EXTENSION_DIR"
