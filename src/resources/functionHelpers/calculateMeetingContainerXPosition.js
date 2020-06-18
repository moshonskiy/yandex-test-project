export const calculateMeetingContainerXPosition = from => {
  if (from[1] === ":") {
    const hourPos = (+from.slice(0, 1) - 7) * 65 - 65;
    const minutePos = (65 / 60) * +from.slice(2);
    return `${hourPos + minutePos}px`;
  }
  const hourPos = (+from.slice(0, 2) - 7) * 65 - 65;
  const minutePos = (65 / 60) * +from.slice(3);
  return `${hourPos + minutePos}px`;
};
