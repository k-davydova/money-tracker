export const formatDate = (date, type = 'day') => {
  const formattedDate = new Date(date);

  const day = String(formattedDate.getDate()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = formattedDate.getFullYear();

  if (type === 'year') {
    return `${year}`;
  }

  if (type === 'month') {
    return `${month}-${year}`;
  }

  if (type === 'day') {
    return `${day}-${month}-${year}`;
  }
};

export const formatTime = (date) => {
  const formattedDate = new Date(date);

  const hours = String(formattedDate.getHours());
  const minutes = String(formattedDate.getMinutes());

  return `${hours}:${minutes}`;
};
