import React from "react";

import { calculateMeetingContainerXPosition } from "../resources/functionHelpers/calculateMeetingContainerXPosition";
import "./CalendarCurrentTimePointer.css";

export const CalendarCurrentTimePointer = ({ currentTime }) => {
  const currTimeXPos = calculateMeetingContainerXPosition(currentTime);
  const currTimeXPosPositioned = `${parseFloat(currTimeXPos) - 25}px`;

  return (
    <div
      className="calendar__timeline-current-time"
      style={{ left: currTimeXPosPositioned }}
    >
      <time className="current-time">{currentTime}</time>
    </div>
  );
};
