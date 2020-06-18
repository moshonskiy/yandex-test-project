import React from "react";

import { connect } from "react-redux";
import { NewMeetingForm } from "../NewMeetingForm/NewMeetingForm";
import { connect as formikConnect } from "formik";
import { withRouter } from "react-router-dom";

const NewMeeting_ = formikConnect(
  withRouter(props => {
    const { startTime, finishTime, dateInput, selectedRoom } = props.location;

    const initialValues = {
      themeInput: "",
      dateInput: dateInput || "",
      startTime: startTime || "",
      finishTime: finishTime || "",
      membersInput: "",
      selectedMembers: [],
      selectedRoom: selectedRoom || ""
    };

    const handleSubmit = values => {
      const id = Math.random();
      const meetingData = { id, ...values };
      props.handleMeetingEvents(meetingData);
      props.handleMeetingCreatedPopUp();
      props.history.push("/");
    };

    return (
      <NewMeetingForm initialValues={initialValues} onSubmit={handleSubmit} />
    );
  })
);

const mapDispatchToProps = dispatch => ({
  handleMeetingEvents: data =>
    dispatch({ type: "ADD_NEW_MEETING", payload: data }),
  handleMeetingCreatedPopUp: () => dispatch({ type: "MEETING_CREATED" })
});

export const NewMeeting = connect(null, mapDispatchToProps)(NewMeeting_);
