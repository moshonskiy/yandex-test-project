import React from "react";

import { Header } from "../Header/Header";
import { CalendarRoomRow } from "../CalendarRoomRow/CalendarRoomRow";
import { rooms } from "../resources/commonVariables/rooms";
import { CalendarCurrentTimePointer } from "../CalendarCurrentTimePointer/CalendarCurrentTimePointer";
import { connect as formikConnect } from "formik";
import { withRouter } from "react-router-dom";
import { getCurrentTime } from "../resources/functionHelpers/getCurrentTime";
import { NewMeetingCreatedPopUp } from "../NewMeetingCreatedPopUp/NewMeetingCreatedPopUp";

import { connect } from "react-redux";

import "./Calendar.css";

const Calendar_ = withRouter(
  formikConnect(
    ({ meetings, meetingCreatedPopUp, newMeetingDate, setMeetingDate }) => {
      const timeLine = new Array(16).fill().map((_, i) => {
        return (
          <time className="calendar__timeline-time" key={i}>
            {i + 8}
          </time>
        );
      });

      const currentTime = getCurrentTime();
      const currTimeToNum = +currentTime.slice(0, 2);

      const handleDate = e => {
        setMeetingDate(e.target.value);
      };

      return (
        <>
          {meetingCreatedPopUp ? <NewMeetingCreatedPopUp /> : null}
          <Header />

          <div className="calendar">
            <div className="calendar__header">
              <div className="calendar__date">
                <button>{"<"}</button>
                <input
                  type="date"
                  className="calendar__date-input"
                  value={newMeetingDate}
                  onChange={handleDate}
                />
                <button>{">"}</button>
              </div>
              <div className="calendar__timeline">
                {timeLine}
                {currTimeToNum >= 8 && currTimeToNum <= 23 ? (
                  <CalendarCurrentTimePointer currentTime={currentTime} />
                ) : null}
              </div>
            </div>
            <div className="calendar__body">
              {Array(9)
                .fill()
                .map((_, i) => {
                  const filteredMeetings = meetings.filter(
                    ({ selectedRoom }) => rooms[i].title === selectedRoom
                  );
                  return (
                    <CalendarRoomRow
                      key={i}
                      room={rooms[i]}
                      meetingEvents={filteredMeetings}
                    />
                  );
                })}
            </div>
          </div>
        </>
      );
    }
  )
);

const mapStateToProps = ({
  meetings,
  meetingCreatedPopUp,
  newMeetingDate
}) => ({
  meetings,
  meetingCreatedPopUp,
  newMeetingDate
});

const mapDispatchToProps = dispatch => ({
  setMeetingDate: date => {
    dispatch({ type: "CURRENT_DATE", payload: date });
  }
});

export const Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar_);
