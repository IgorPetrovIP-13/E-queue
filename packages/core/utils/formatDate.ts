export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };

  const dateTimeFormat = new Intl.DateTimeFormat("uk-UA", options);
  const parts = dateTimeFormat.formatToParts(new Date(date));
  const getPart = (type: string) =>
    parts.find(p => p.type === type)?.value || "00";

  const formattedDate = `${getPart("day")}.${getPart("month")}.${getPart("year")} ${getPart("hour")}:${getPart("minute")}`;

  return formattedDate;
};
