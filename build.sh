#!/bin/bash
# Tongkat Sakti Build Script

set -e

echo "Building Tongkat Sakti v1.0.0..."

# Clean
rm -f Tongkat-Sakti-v1.0.0.mcaddon
rm -rf build_temp

# Create directories
mkdir -p build_temp/behavior_packs/TongkatSakti/{items,scripts/modules,texts}
mkdir -p build_temp/resource_packs/TongkatSakti

# Copy files
cp -r behavior_packs/TongkatSakti/* build_temp/behavior_packs/TongkatSakti/
cp -r resource_packs/TongkatSakti/* build_temp/resource_packs/TongkatSakti/

# Create ZIP
cd build_temp
zip -r ../Tongkat-Sakti-v1.0.0.mcaddon . -x "*.DS_Store" "*.git*"
cd ..

# Cleanup
rm -rf build_temp

echo "✅ Build complete!"
echo "📦 File: Tongkat-Sakti-v1.0.0.mcaddon"
