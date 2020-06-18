export const addMeeting = (payload) => {
    return {
        type: 'ADD_NEW_MEETING',
        payload
    }
};

export const editMeeting = (payload) => {
    return {
        type: 'EDIT_MEETING',
        payload
    }
}