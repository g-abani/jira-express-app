# Binary Distribution Directory

This directory contains the built binary executables for the JIRA Express App.

## 🏗️ Building Binaries

To create the binary executables, run:

```bash
# Build for all platforms
npm run build

# Or build for specific platforms
npm run build:linux    # Linux x64
npm run build:windows  # Windows x64  
npm run build:macos    # macOS x64
```

## 📦 Generated Files

After building, this directory will contain:
- `jira-express-app-linux` - Linux x64 executable (~47 MB)
- `jira-express-app-macos` - macOS x64 executable (~52 MB)
- `jira-express-app-win.exe` - Windows x64 executable (~39 MB)

## 📋 Distribution

1. Copy the appropriate binary to your target machine
2. Create a `.env` file with your JIRA configuration (use `.env.example` as template)
3. Make executable: `chmod +x jira-express-app-*` (Linux/macOS)
4. Run: `./jira-express-app-linux` or similar

See `../DISTRIBUTION.md` for complete setup instructions.

## ⚠️ Note

Binary files are excluded from git due to size limits. Build them locally using the npm scripts above.
