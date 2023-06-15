const { format } = require('date-fns');

const formatDate = (date) => {
  if (!date) {
    const today = new Date();
    const dateString = format(today, 'yyyy-MM-dd');
    return dateString;
  }

  const formattedDate = format(date, 'yyyy-MM-dd');
  
  return formattedDate;
};

module.exports = { formatDate };