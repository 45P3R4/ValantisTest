export function getPass() {
  return ("Valantis_" + date.getUTCFullYear() + addLeadingZero(date.getUTCMonth()+1) + addLeadingZero(date.getUTCDate()));
}

var date = new Date();
function addLeadingZero(date) {
  date = ('0' + date).slice(-2);
  return date;
}