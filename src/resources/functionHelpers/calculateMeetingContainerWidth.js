export const calculateMeetingContainerWidth = (from, to) => {
  const fromHours = +from.slice(0, 2); // 16
  const fromMinutes = +from.slice(3) / 60; // .25?

  const toHours = +to.slice(0, 2); // 17
  const toMinutes = +to.slice(3) / 60; // .5

  return toHours + toMinutes - (fromHours + fromMinutes);
};
