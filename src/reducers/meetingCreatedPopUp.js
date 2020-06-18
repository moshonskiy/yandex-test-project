export const meetingCreatedPopUp = (state = false, action) => {
  switch (action.type) {
    case "MEETING_CREATED":
      return !state;
    default:
      return state;
  }
};
