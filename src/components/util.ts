export const getDateFormat = (date: Date): string => {
  const d = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const min = d.getMinutes();
  const ampm = hours > 12 ? "PM" : "AM";
  hours = hours % 12;
  const minutes = min < 10 ? "0" + min : min.toString();
  return `${day} ${month} ${year} @ ${hours}:${minutes}${ampm}`;
};
