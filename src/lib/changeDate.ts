export const changeDate = (date: any) => {
  return date.substr(0, 10).replaceAll('-', '.');
};
