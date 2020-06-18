import React from "react";

import { membersData } from "../resources/commonVariables/membersData";

import "./MeetingDescriptionInCalendar.css";
import { withRouter } from "react-router-dom";
import { connect as formikConnect } from "formik";
import { connect } from "react-redux";

const MeetingDecriptionInCalendar_ = withRouter(
  formikConnect(props => {
    const {
      themeInput,
      dateInput,
      startTime,
      finishTime,
      selectedRoom,
      selectedMembers,
      id
    } = props.meeting;
    console.log("meetingdesc", props);

    const handleDate = date => {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
      const dateArr = date.split("-");

      return `${dateArr[2]} ${months[+dateArr[1] - 1]}`;
    };

    const { memberName } = membersData.find(
      member => member.id === selectedMembers[0]
    );

    const topPosition = `${parseInt(props.top) + 28}px`;

    const handleMeetingEdit = () => {
      props.history.push({ pathname: `/editform/${id}`, state: props.meeting });
      //props.location({state: props.meeting})
    };

    return (
      <div
        className="meeting-desc"
        style={{ left: props.left, top: topPosition }}
      >
        <div className="meeting-desc__title">
          <span className="meeting-desc__title-text">{themeInput}</span>
          <span
            className="meeting-desc__title-edit"
            onClick={handleMeetingEdit}
          >
            Редактировать встречу
          </span>
        </div>
        <div className="meeting-desc__info">
          <span>{handleDate(dateInput)},</span>
          <span>{startTime}</span>
          <span>-</span>
          <span>{finishTime}</span>
          <span className="meeting-desc-info__dot"> . </span>
          <span>{selectedRoom}</span>
        </div>
        <div className="meeting-desc__members">
          <div className="meeting-desc__members-member">
            <img
              src="#"
              alt="member-logo"
              className="meeting-desc__member-logo"
            />
            <span className="meeting-desc__member-name">{memberName}</span>
          </div>
          <span className="meeting-desc__members-other-members">
            {selectedMembers.length > 1
              ? `и ${selectedMembers.length - 1} участника`
              : null}
          </span>
        </div>
      </div>
    );
  })
);

export const MeetingDecriptionInCalendar = connect(null)(
  MeetingDecriptionInCalendar_
);
