import { rooms } from "../commonVariables/rooms";

export const calculateMeetingContainerYPosition = room => {
  const roomIndex = rooms.findIndex(x => x.title === room);
  return `${roomIndex * 44 + 8}px`;
};
