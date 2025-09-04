const express = require('express');
const { createJiraClient } = require('../lib/jiraClient');

const router = express.Router();

router.get('/issues', async (req, res) => {
  try {
    const { jql, startAt, maxResults } = req.query;
    const effectiveJql = jql || process.env.JIRA_DEFAULT_JQL;
    if (!effectiveJql) {
      return res.status(400).json({ error: 'Missing JQL. Provide ?jql= or set JIRA_DEFAULT_JQL.' });
    }
    const client = createJiraClient();
    const data = await client.searchIssues(effectiveJql, Number(startAt) || 0, Number(maxResults) || 50);
    res.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.message, details: error.response?.data });
  }
});

router.get('/issues/:key', async (req, res) => {
  try {
    const client = createJiraClient();
    const data = await client.getIssue(req.params.key);
    res.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.message, details: error.response?.data });
  }
});

router.post('/issues/:key/comment', async (req, res) => {
  try {
    const { body } = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Missing required field in body: body' });
    }
    const client = createJiraClient();
    const data = await client.addComment(req.params.key, body);
    res.status(201).json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.message, details: error.response?.data });
  }
});

module.exports = router;


