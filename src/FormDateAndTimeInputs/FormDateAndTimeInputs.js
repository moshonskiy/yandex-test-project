import React from "react";
import { connect, getIn, ErrorMessage } from "formik";

import "./FormDateAndTimeInputs.css";

const FormDateAndTimeInputs = props => {
  const touchedDate = getIn(props.formik.touched.dateInput);
  const touchedStartTime = getIn(props.formik.touched.startTime);
  const touchedFinishTime = getIn(props.formik.touched.finishTime);

  const errorDate = getIn(props.formik.errors.dateInput);
  const errorStartTime = getIn(props.formik.errors.startTime);
  const errorFinishTime = getIn(props.formik.errors.finishTime);

  return (
    <div className="new-meeting-page-form__date">
      <div className="new-meeting-page-form__date-wrapper">
        <h3 className="new-meeting-page-form__input-header">Дата</h3>
        <input
          type="date"
          placeholder="Smth"
          name="dateInput"
          className={
            touchedDate && errorDate
              ? "has-error new-meeting-page-form__date-input"
              : "new-meeting-page-form__date-input"
          }
          value={props.formik.values.dateInput}
          onChange={props.formik.handleChange}
          onFocus={props.formik.handleFocus}
          onBlur={props.formik.handleBlur}
        />
        <ErrorMessage
          name="dateInput"
          render={() => (
            <span className="required-field">
              {props.formik.errors.dateInput}
            </span>
          )}
        />
      </div>

      <div className="new-meeting-page-form__time-start-wrapper">
        <h3 className="new-meeting-page-form__input-header">Начало</h3>
        <input
          type="time"
          placeholder="Smth start"
          name="startTime"
          className={
            touchedStartTime && errorStartTime
              ? "has-error new-meeting-page-form__time-start-input"
              : "new-meeting-page-form__time-start-input"
          }
          maxLength="5"
          value={props.formik.values.startTime}
          onChange={props.formik.handleChange}
          onFocus={props.formik.handleFocus}
          onBlur={props.formik.handleBlur}
        />
        <ErrorMessage
          name="startTime"
          render={() => (
            <span className="required-field">
              {props.formik.errors.startTime}
            </span>
          )}
        />
      </div>

      <div className="new-meeting-page-form__time-end-wrapper">
        <h3 className="new-meeting-page-form__input-header">Конец</h3>
        <input
          type="time"
          placeholder="Smth finish"
          name="finishTime"
          maxLength="5"
          className={
            touchedFinishTime && errorFinishTime
              ? "has-error new-meeting-page-form__time-end-input"
              : "new-meeting-page-form__time-end-input"
          }
          value={props.formik.values.finishTime}
          onChange={props.formik.handleChange}
          onFocus={props.formik.handleFocus}
          onBlur={props.formik.handleBlur}
        />
        <ErrorMessage
          name="finishTime"
          render={() => (
            <span className="required-field">
              {props.formik.errors.finishTime}
            </span>
          )}
        />
      </div>
    </div>
  );
};

export default connect(FormDateAndTimeInputs);
