export const meetingDeleteWarningPopUp = (state = false, action) => {
  switch (action.type) {
    case "DELETE_WARNING":
      return !state;
    default:
      return state;
  }
};
