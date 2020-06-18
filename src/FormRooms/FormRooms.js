import React from "react";

import { rooms } from "../resources/commonVariables/rooms";
import { connect as formikConnect, ErrorMessage } from "formik";

import { withRouter } from "react-router-dom";

import "./FormRooms.css";

const FormRooms = withRouter(props => {
  const { selectedRoom, setSelectedRoom } = props;

  if (!selectedRoom) {
    return (
      <div className="new-meeting-form__room">
        <h3 className="new-meeting-page-form__input-header">
          Ваша переговорка
        </h3>
        {rooms.map(({ id, title, floor }) => (
          <label className="new-meeting-form__room-item" key={id}>
            <input
              type="radio"
              className="new-meeting-form__room-item-input"
              name="rooms"
              value={id}
              onClick={() => {
                setSelectedRoom(title);
              }}
            />
            <span className="new-meeting-form__room-selected-time-text">
              {props.formik.values.startTime}
            </span>
            {props.formik.values.startTime.length === 5 ? (
              <span> – </span>
            ) : null}
            <span className="new-meeting-form__room-selected-time-text">
              {props.formik.values.finishTime}
            </span>
            <span className="new-meeting-form__room-selected-name-text">
              {title}
            </span>
            <span className="new-meeting-form__room-selected-floor-text">
              {floor}
            </span>
          </label>
        ))}
        <ErrorMessage
          name="selectedRoom"
          render={() => (
            <span className="required-field">
              {props.formik.errors.selectedRoom}
            </span>
          )}
        />
      </div>
    );
  }

  const { title, floor } = rooms.find(
    room => room.title === props.formik.values.selectedRoom
  );

  return (
    <div className="new-meeting-form__room">
      <h3 className="new-meeting-page-form__input-header">Ваша переговорка</h3>
      <button className="new-meeting-form__room-selected" disabled>
        <span className="new-meeting-form__room-selected-time-text">
          {props.formik.values.startTime}
        </span>
        {props.formik.values.startTime.length === 5 ? <span> – </span> : null}
        <span className="new-meeting-form__room-selected-time-text">
          {props.formik.values.finishTime}
        </span>
        <span className="new-meeting-form__room-selected-name-text">
          {title}
        </span>
        <span className="new-meeting-form__room-selected-floor-text">
          {floor}
        </span>
        <span
          className="new-meeting-form__room-selected-close-btn"
          onClick={e => {
            setSelectedRoom("");
          }}
        >
          Закрыть
        </span>
      </button>
    </div>
  );
});

export default formikConnect(FormRooms);
