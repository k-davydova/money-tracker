export const formatDate = (date) => {
  const formattedDate = new Date(date);

  const day = String(formattedDate.getDate()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = formattedDate.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatTime = (date) => {
  const formattedDate = new Date(date);

  const hours = String(formattedDate.getHours());
  const minutes = String(formattedDate.getMinutes());

  return `${hours}:${minutes}`;
};
