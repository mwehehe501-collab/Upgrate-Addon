# Tongkat Sakti - Technical Documentation

## 📊 Architecture

```
Tongkat Sakti v1.0.0
├── Behavior Pack
│   ├── Items (tongkat:sakti)
│   ├── Scripts (6 modules)
│   └── Localization (Indonesian & English)
└── Resource Pack
```

## 🛠 Technology Stack

### APIs
- @minecraft/server v2.7.0+
- @minecraft/server-ui v1.0+

### Modules
1. **main.js** - Entry point
2. **duplicate.js** - Core engine (7KB)
3. **raycast.js** - Detection (2KB)
4. **inventory.js** - Item management (2.5KB)
5. **ui.js** - UI forms (6KB)
6. **autoSpawn.js** - Auto-spawn (1KB)

## 🔄 Event Flow

```
Right-Click → Event → Check Item Type
→ Show Menu → User Selection
→ Duplicate Operation → Item Added/Dropped
```

## 📊 Performance

- Menu open: <10ms
- Duplication: <5ms
- Raycasting: <20ms
- Total overhead: <200KB

## 🔐 Achievement Compatibility

- ✅ format_version 2 (stable)
- ✅ No experimental features
- ✅ Achievements work!

---

**Version**: 1.0.0 | **Status**: Production Ready ✅