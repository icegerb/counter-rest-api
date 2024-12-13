const convertToCSV = (data) => {
  const header = 'Word, Count\n';
  const row = data.map(({ word, count }) => `${word}, ${count}`).join('\n');
  return header + row;
};

module.exports = { convertToCSV };
