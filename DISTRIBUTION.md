# JIRA Express App - Binary Distribution Guide

## 📦 Available Binaries

- **Linux (x64)**: `jira-express-app-linux`
- **macOS (x64)**: `jira-express-app-macos`  
- **Windows (x64)**: `jira-express-app-win.exe`

## 🚀 How to Use on Target Machines

### 1. Copy Binary to Target Machine
```bash
# Copy the appropriate binary for your platform
scp dist/jira-express-app-linux user@server:/path/to/app/
# or 
scp dist/jira-express-app-macos user@mac:/path/to/app/
```

### 2. Set Up Environment Variables
Create a `.env` file in the same directory as the binary:

```bash
PORT=3000
JIRA_BASE_URL=https://jira.corp.adobe.com
JIRA_TOKEN=your-bearer-token-here
JIRA_DEFAULT_JQL=assignee=currentUser()
```

### 3. Make Executable (Linux/macOS)
```bash
chmod +x jira-express-app-linux
# or
chmod +x jira-express-app-macos
```

### 4. Run the Application

**Linux/macOS:**
```bash
./jira-express-app-linux
# or
./jira-express-app-macos
```

**Windows:**
```cmd
jira-express-app-win.exe
```

## 🔧 Configuration

The binary reads environment variables from:
1. `.env` file in the same directory
2. System environment variables

### Required Environment Variables:
- `JIRA_BASE_URL` - Your JIRA instance URL
- `JIRA_TOKEN` - Your JIRA Bearer token

### Optional Environment Variables:
- `PORT` - Server port (default: 3000)
- `JIRA_DEFAULT_JQL` - Default JQL query when none provided

## 📡 API Endpoints

Once running, the following endpoints are available:

- `GET /health` - Health check
- `GET /jira/issues?jql=<JQL>&startAt=0&maxResults=50` - Search issues
- `GET /jira/issues/:key` - Get issue details
- `POST /jira/issues/:key/comments` - Add comment

### Example Usage:
```bash
# Health check
curl http://localhost:3000/health

# Search issues
curl "http://localhost:3000/jira/issues?jql=assignee=currentUser()"

# Get specific issue
curl http://localhost:3000/jira/issues/PROJ-123

# Add comment
curl -X POST "http://localhost:3000/jira/issues/PROJ-123/comments" \
  -H "Content-Type: application/json" \
  -d '{"body": "Test comment from API"}'
```

## 📋 Response Format

All endpoints return clean, filtered responses with only essential fields:
- `id` - Issue ID
- `key` - Issue key  
- `description` - Issue description
- `assignee` - Assignee details (name, displayName, emailAddress)
- `reporter` - Reporter details (name, displayName, emailAddress)

## ⚠️ Important Notes

1. **No Node.js Required**: These binaries are self-contained and don't require Node.js
2. **Environment File**: Always include a `.env` file with your configuration
3. **Network Access**: Ensure the target machine can reach your JIRA instance
4. **Permissions**: On Linux/macOS, ensure execute permissions are set
5. **Firewall**: Open the port (default: 3000) if needed

## 🔒 Security

- Keep your JIRA token secure
- Use HTTPS in production
- Consider running behind a reverse proxy
- Set appropriate firewall rules

## 🐛 Troubleshooting

1. **Permission Denied**: Run `chmod +x <binary-name>`
2. **Port in Use**: Change PORT in .env file
3. **JIRA Connection Issues**: Verify JIRA_BASE_URL and JIRA_TOKEN
4. **Missing .env**: Create .env file in same directory as binary
