const axios = require('axios');

function createJiraClient() {
  const baseUrl = process.env.JIRA_BASE_URL;
  const bearerToken = process.env.JIRA_TOKEN;

  if (!baseUrl) {
    throw new Error('Missing JIRA_BASE_URL env var');
  }
  if (!bearerToken) {
    throw new Error('Missing JIRA_TOKEN env var');
  }

  const http = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  async function searchIssues(jql, startAt = 0, maxResults = 50) {
    const response = await http.get('/rest/api/2/search', {
      params: { jql, startAt, maxResults },
    });
    
    // Filter response to only include id, key, description, assignee, and reporter
    const filteredIssues = response.data.issues.map(issue => ({
      id: issue.id,
      key: issue.key,
      description: issue.fields.description,
      assignee: issue.fields.assignee ? {
        name: issue.fields.assignee.name,
        displayName: issue.fields.assignee.displayName,
        emailAddress: issue.fields.assignee.emailAddress
      } : null,
      reporter: issue.fields.reporter ? {
        name: issue.fields.reporter.name,
        displayName: issue.fields.reporter.displayName,
        emailAddress: issue.fields.reporter.emailAddress
      } : null
    }));
    
    return {
      startAt: response.data.startAt,
      maxResults: response.data.maxResults,
      total: response.data.total,
      issues: filteredIssues
    };
  }

  async function getIssue(issueKeyOrId) {
    const response = await http.get(`/rest/api/2/issue/${encodeURIComponent(issueKeyOrId)}`);
    
    // Filter response to only include id, key, description, assignee, and reporter
    return {
      id: response.data.id,
      key: response.data.key,
      description: response.data.fields.description,
      assignee: response.data.fields.assignee ? {
        name: response.data.fields.assignee.name,
        displayName: response.data.fields.assignee.displayName,
        emailAddress: response.data.fields.assignee.emailAddress
      } : null,
      reporter: response.data.fields.reporter ? {
        name: response.data.fields.reporter.name,
        displayName: response.data.fields.reporter.displayName,
        emailAddress: response.data.fields.reporter.emailAddress
      } : null
    };
  }

  async function addComment(issueKeyOrId, body) {
    const response = await http.post(`/rest/api/2/issue/${encodeURIComponent(issueKeyOrId)}/comment`, {
      body,
    });
    return response.data;
  }

  return { searchIssues, getIssue, addComment };
}

module.exports = { createJiraClient };


