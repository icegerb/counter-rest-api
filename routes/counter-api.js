const express = require('express');
const path = require('path');
const fs = require('fs');
const { getWordsCount } = require('../utils/getWordsCount');
const { convertToCSV } = require('../utils/convertToCSV.js');
const { readFile } = require('../utils/readFile.js');
const { handleError } = require('../utils/handleError.js');
const router = express.Router();

const filePath = path.join(__dirname, '../test.txt');

router.post('/search', async (req, res) => {
  const { searchText } = req.body;

  if (!Array.isArray(searchText)) {
    return handleError(
      res,
      400,
      'Bad request',
      'searchText should be an array of string.'
    );
  }

  try {
    const data = await readFile(filePath);
    const wordCounts = getWordsCount(data);

    const result = searchText.map((word) => ({
      [word]: wordCounts[word] || 0,
    }));

    res.json({ counts: result });
  } catch (error) {
    handleError(
      res,
      500,
      'Internal Server Error',
      'Failed to read the text file.'
    );
  }
});

router.get('/top/:topN', async (req, res) => {
  const { topN } = req.params;

  if (isNaN(topN) || topN <= 0) {
    return handleError(
      res,
      400,
      'Bad Request',
      'The topN parameter must be a positive number'
    );
  }

  try {
    const data = await readFile(filePath);
    const wordCounts = getWordsCount(data);

    const sortedCounts = Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, parseInt(topN, 10));

    if (req.headers.accept === 'text/csv') {
      const csvData = convertToCSV(sortedCounts);
      res.setHeader('Content-Type', 'text/csv');
      res.send(csvData);
    } else {
      res.json(sortedCounts);
    }
  } catch (error) {
    handleError(
      res,
      500,
      'Internal Server Error',
      'Failed to read the text file.'
    );
  }
});

module.exports = router;
