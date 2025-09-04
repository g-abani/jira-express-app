# JIRA Express API

Express server to search JIRA issues, fetch issue details, and add comments via REST.

## Setup

1. Create `.env` in project root:

```
PORT=3000
JIRA_BASE_URL=https://jira.corp.adobe.com
JIRA_TOKEN=your-bearer-token
```

2. Install dependencies and run:

```
npm install
npm run dev
```

## Endpoints

- `GET /health` — health check
- `GET /jira/issues?jql=<JQL>&startAt=0&maxResults=50` — search issues
- `GET /jira/issues/:key` — get issue details
- `POST /jira/issues/:key/comments` — add a comment
  - Body: `{ "body": "Your comment text" }`

## Example JQL

```
assignee=currentUser() AND statusCategory!=Done AND Team="Naksha" AND labels in ("agent")
```


