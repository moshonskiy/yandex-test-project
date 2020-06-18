export const newMeetingDate = (state = "", action) => {
  switch (action.type) {
    case "CURRENT_DATE":
      return action.payload;
    default:
      return state;
  }
};
