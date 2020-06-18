import React from "react";
import { connect as formikConnect } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./NewMeetingCreatedPopUp.css";

const NewMeetingCreatedPopUp_ = withRouter(
  formikConnect(props => {
    return (
      <div className="new-meeting-created-pop-up-message-wrapper">
        <div className="new-meeting-created-pop-up-message">
          <div className="new-meeting-created-pop-up-message__svg"></div>
          <div className="new-meeting-created-pop-up-message__info">
            <span className="new-meeting-created-pop-up-message__header">
              Встреча создана!
            </span>
            <span className="new-meeting-created-pop-up-message__meeting-info-first-line">
              14 декабря, 17:00 - 19:00
            </span>
            <span className="new-meeting-created-pop-up-message__meeting-info-second-line">
              Готэм . 4 этаж
            </span>
          </div>
          <button
            className="new-meeting-created-pop-up-message__btn"
            onClick={() => props.handleMeetingCreatedPopUp()}
          >
            Хорошо
          </button>
        </div>
      </div>
    );
  })
);

const mapDispatchToProps = dispatch => ({
  handleMeetingCreatedPopUp: () => dispatch({ type: "MEETING_CREATED" })
});

export const NewMeetingCreatedPopUp = connect(
  null,
  mapDispatchToProps
)(NewMeetingCreatedPopUp_);
