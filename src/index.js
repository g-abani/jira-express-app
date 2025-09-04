const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jiraRouter = require('./routes/jira');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/jira', jiraRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


