const defaultMeetingEvent = {
  id: 0.129495949589894,
  themeInput: "Aaaa",
  dateInput: "2020-01-01",
  startTime: "08:00",
  finishTime: "11:00",
  selectedRoom: "Прачечная",
  selectedMembers: ["#frik409jg9ij3409"]
};

export const meetings = (state = [defaultMeetingEvent], action) => {
  switch (action.type) {
    case "ADD_NEW_MEETING":
      return [...state, action.payload];
    case "EDIT_MEETING":
      const filteredMeetings = state.filter(
        meeting => meeting.id !== action.id
      );
      return [...filteredMeetings, action.payload];
    case "DELETE_MEETING":
      return state.filter(meeting => meeting.id !== action.id);
    default:
      return state;
  }
};
