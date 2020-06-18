import React from "react";
import { connect, getIn, ErrorMessage } from "formik";

import "./FormThemeInput.css";

const FormThemeInput = props => {
  const touched = getIn(props.formik.touched.themeInput);
  const error = getIn(props.formik.errors.themeInput);
  const input = getIn(props.formik.values.themeInput);

  return (
    <div className="new-meeting-page-form__theme">
      <h3 className="new-meeting-page-form__input-header">Тема</h3>
      <input
        type="text"
        name="themeInput"
        placeholder="О чём будете говорить?"
        className={
          touched && error
            ? "has-error new-meeting-page-form__theme-input"
            : "new-meeting-page-form__theme-input"
        }
        value={props.formik.values.themeInput}
        onChange={props.formik.handleChange}
        onFocus={props.formik.handleFocus}
        onBlur={props.formik.handleBlur}
      />
      <ErrorMessage
        name="themeInput"
        render={() => (
          <span className="required-field">
            {props.formik.errors.themeInput}
          </span>
        )}
      />
      {input.length >= 4 ? (
        <span
          className="new-meeting-page-form__theme-clear-input-btn"
          onClick={() => props.formik.setFieldValue("themeInput", "")}
        >
          x
        </span>
      ) : null}
    </div>
  );
};

export default connect(FormThemeInput);
