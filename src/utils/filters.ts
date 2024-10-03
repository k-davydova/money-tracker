export const filterByCurrentMonth = (items: Transaction[]) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return items.filter(({ datetime }) => {
    const itemDate = new Date(datetime);

    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    );
  });
};
