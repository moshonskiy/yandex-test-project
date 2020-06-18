import { createStore, combineReducers } from 'redux';
import { meetings } from '../reducers/meetings';
import { editMeetingDescription } from '../reducers/editMeetingDescription';
import { meetingDeleteWarningPopUp } from '../reducers/meetingDeleteWarningPopUp';
import { meetingCreatedPopUp } from '../reducers/meetingCreatedPopUp';
import { newMeetingDate } from '../reducers/newMeetingDate';


const rootReducer = combineReducers({
    meetings,
    editMeetingDescription,
    meetingDeleteWarningPopUp,
    meetingCreatedPopUp,
    newMeetingDate
});

export const store = createStore(
        rootReducer,
        // JSON.parse(localStorage.getItem('meetings')) || {},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );


store.subscribe(() => localStorage.setItem('meetings', JSON.stringify(store.getState())));