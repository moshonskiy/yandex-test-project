import React from "react";

import { connect } from "react-redux";
import { connect as formikConnect } from "formik";
import { EditMeetingForm } from "../NewMeetingForm/EditMeetingForm";

import { withRouter } from "react-router-dom";

const EditMeeting_ = withRouter(
  formikConnect(props => {
    const {
      id,
      themeInput,
      dateInput,
      startTime,
      finishTime,
      membersInput,
      selectedMembers,
      selectedRoom
    } = props.location.state;

    const initialValues = {
      themeInput: themeInput,
      dateInput: dateInput,
      startTime: startTime,
      finishTime: finishTime,
      membersInput: membersInput,
      selectedMembers: selectedMembers,
      selectedRoom: selectedRoom
    };

    const handleSubmit = values => {
      const newMeeting = { id, ...values };
      props.editMeetingInMeetings(newMeeting, id);
    };

    return (
      <EditMeetingForm initialValues={initialValues} onSubmit={handleSubmit} />
    );
  })
);

const mapStateToProps = ({ meetings }) => ({
  meetings
});

const mapDispatchToProps = dispatch => ({
  editMeetingInMeetings: (editedMeetingData, id) => {
    dispatch({ type: "EDIT_MEETING", payload: editedMeetingData, id: id });
  }
});

export const EditMeeting = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMeeting_);
