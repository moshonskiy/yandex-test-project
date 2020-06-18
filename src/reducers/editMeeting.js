export const editMeeting = (state, action) => {
  switch (action.type) {
    case "EDIT_MEETING":
      const editedMeeting = { ...action.payload };
      const filteredState = state.filter(meeting => meeting.id !== action.id);
      return { ...filteredState, editedMeeting };
    default:
      return state;
  }
};
