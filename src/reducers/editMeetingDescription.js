export const editMeetingDescription = (state = null, action) => {
  switch (action.type) {
    case "EDIT_MEETING_DESCRIPTION":
      return action.payload;
    default:
      return state;
  }
};
