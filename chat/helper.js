const { format, isToday, isYesterday } = require('date-fns');

function formatChatTime(date) {
  const msgDate = new Date(date);
  if (isToday(msgDate)) {
    return format(msgDate, 'p'); // e.g., "10:30 AM"
  } else if (isYesterday(msgDate)) {
    return 'Yesterday';
  } else {
    return format(msgDate, 'dd/MM/yyyy'); // e.g., "29/07/2025"
  }
}

module.exports={formatChatTime}