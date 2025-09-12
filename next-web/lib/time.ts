export function toUnixSeconds(date: Date) {
  return Math.floor(date.getTime() / 1000);
}
export function fromLocalDatetime(dtLocal: string) {
  const d = new Date(dtLocal);
  if (isNaN(d.getTime())) throw new Error("Invalid datetime");
  return d;
}
