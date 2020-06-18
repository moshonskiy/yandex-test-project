import React, { useState } from "react";

import { calculateMeetingContainerWidth } from "../resources/functionHelpers/calculateMeetingContainerWidth";
import { calculateMeetingContainerXPosition } from "../resources/functionHelpers/calculateMeetingContainerXPosition";
import { MeetingDecriptionInCalendar } from "../MeetingDescriptionInCalendar/MeetingDescriptionInCalendar";
import { getCurrentDate } from "../resources/functionHelpers/getCurrentDate";
import { withRouter } from "react-router-dom";
import { connect as formikConnect } from "formik";
import { connect } from "react-redux";

import "./CalendarRoomRow.css";

const CalendarRoomRow_ = withRouter(
  formikConnect(props => {
    const [titleOnHover, setTitleOnHover] = useState(false);

    const emptyCells = new Array(16).fill().map((_, i) => {
      const handleClick = () => {
        const finishTimeRegular = i < 2 ? `0${i + 9}:00` : `${i + 9}:00`;
        const finishTimeMidnight = "00:00";

        props.history.push({
          pathname: "/newmeetingform",
          dateInput: props.newMeetingDate
            ? props.newMeetingDate
            : getCurrentDate(),
          startTime: i < 2 ? `0${i + 8}:00` : `${i + 8}:00`,
          finishTime: i !== 15 ? finishTimeRegular : finishTimeMidnight,
          selectedRoom: props.room.title
        });
      };
      return (
        <div
          className="meeting-empty-cell"
          key={i}
          onMouseEnter={() => setTitleOnHover(true)}
          onMouseLeave={() => setTitleOnHover(false)}
          onClick={handleClick}
        ></div>
      );
    });

    return (
      <div className="calendar-room-row">
        <div key={props.room.title} className="calendar-meeting-rooms">
          <p
            className={
              titleOnHover
                ? "calendar-meeting-rooms__title title_on_hover"
                : "calendar-meeting-rooms__title"
            }
          >
            {props.room.title}
          </p>
          <p className="calendar-meeting-rooms__quantity">
            {props.room.quantity}
          </p>
        </div>

        <div className="calendar-meeting-timeline">
          {emptyCells}
          {props.meetingEvents.map(meeting => {
            const width = `${calculateMeetingContainerWidth(
              meeting.startTime,
              meeting.finishTime
            ) * 65}px`;
            const popUpMessagePos = `${calculateMeetingContainerWidth(
              "08:00",
              meeting.finishTime
            ) *
              65 -
              parseInt(width) / 2}px`;
            const xPos = calculateMeetingContainerXPosition(meeting.startTime);

            return (
              <>
                <div
                  key={meeting.id}
                  className="meeting"
                  value={meeting.themeInput}
                  style={{ width, left: xPos, top: "8px" }}
                  onClick={() =>
                    props.editMeetingDesc(
                      props.editMeetingDescription !== meeting.id
                        ? meeting.id
                        : null
                    )
                  }
                ></div>
                {props.editMeetingDescription === meeting.id ? (
                  <MeetingDecriptionInCalendar
                    meeting={meeting}
                    left={popUpMessagePos}
                    top={"8px"}
                  />
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    );
  })
);

const mapStateToProps = ({ editMeetingDescription, newMeetingDate }) => ({
  editMeetingDescription,
  newMeetingDate
});

const mapDispatchToProps = dispatch => ({
  editMeetingDesc: newState => {
    dispatch({ type: "EDIT_MEETING_DESCRIPTION", payload: newState });
  }
});

export const CalendarRoomRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarRoomRow_);
