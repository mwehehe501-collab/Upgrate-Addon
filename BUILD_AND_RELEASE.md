# Build & Release Guide

## 📦 Building .mcaddon

### Quick Build
```bash
bash build.sh
# Output: Tongkat-Sakti-v1.0.0.mcaddon
```

## 🚀 Publishing to GitHub

### Create Release
```bash
gh release create v1.0.0 --title "Tongkat Sakti v1.0.0"
```

### Upload .mcaddon
```bash
gh release upload v1.0.0 Tongkat-Sakti-v1.0.0.mcaddon
```

## ✅ Checklist

- [x] All files uploaded
- [x] Documentation complete
- [x] build.sh tested
- [x] Ready for release

---

**Status**: ✅ PRODUCTION READY