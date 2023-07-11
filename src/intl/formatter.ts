export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

export const formatDateTime = (value: string): string => {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(value));
};
