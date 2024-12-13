const getWordsCount = (text) => {
  const wordCounts = {};
  const textWords = text
    .split(/[\s.,;!?()"\-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  textWords.forEach((word) => {
    if (word) wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  return wordCounts;
};

module.exports = { getWordsCount };
