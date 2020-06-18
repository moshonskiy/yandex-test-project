import React from "react";
import { connect as formikconnect } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./MeetingDeleteWarningPopUp.css";

const MeetingDeleteWarningPopUp_ = withRouter(
  formikconnect(props => {
    const handleDeleteMeeting = () => {
      props.deleteMeetingInMeetings(props.location.state.id);
      props.history.push("/");
    };

    return (
      <div className="meeting-delete-warning-pop-up-message-wrapper">
        <div className="meeting-delete-warning-pop-up-message">
          <div className="meeting-delete-warning-pop-up-message__svg"></div>
          <div className="meeting-delete-warning-pop-up-message__info">
            <span className="meeting-created-pop-up-message__text">
              Встреча будет
            </span>
            <br />
            <span className="meeting-created-pop-up-message__text">
              удалена безвозвратно
            </span>
          </div>
          <div className="meeting-delete-warning-pop-up-message-btns">
            <button
              className="meeting-delete-warning-pop-up-message__btn"
              onClick={() => props.deleteWarning()}
            >
              Отмена
            </button>
            <button
              className="meeting-delete-warning-pop-up-message__btn"
              onClick={handleDeleteMeeting}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  })
);

const mapDispatchToProps = dispatch => ({
  deleteWarning: () => {
    dispatch({ type: "DELETE_WARNING" });
  },
  deleteMeetingInMeetings: id => {
    dispatch({ type: "DELETE_MEETING", id: id });
  }
});

export const MeetingDeleteWarningPopUp = connect(
  null,
  mapDispatchToProps
)(MeetingDeleteWarningPopUp_);
