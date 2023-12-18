export function timeFormatter(dateStr) {
  let date, time, dateTime;

  dateStr = new Date(dateStr);
  date =
    dateStr.getFullYear() +
    "-" +
    (dateStr.getMonth() + 1) +
    "-" +
    dateStr.getDate();
  time =
    dateStr.getHours() +
    ":" +
    dateStr.getMinutes() +
    ":" +
    dateStr.getSeconds();

  dateTime = date + " " + time;

  return dateTime;
}
