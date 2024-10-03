export const saveToLocalStorage = (
  key: string,
  value: { incomes: Transaction[]; expenses: Transaction[] }
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
