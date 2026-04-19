export function formatDate(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date)) return '';

  const dateFormated = {
    'day': date.getDate().toString().padStart(2, '0'),
    'month': (date.getMonth() + 1).toString().padStart(2, '0'),
    'year': date.getFullYear(),
    'hour':date.getHours().toString().padStart(2, '0'),
    'minutes':date.getMinutes().toString().padStart(2, '0')
}
  return dateFormated;
}