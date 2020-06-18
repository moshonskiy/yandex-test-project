import React from "react";

import FormThemeInput from "../FormThemeInput/FormThemeInput";
import FormDateAndTimeInputs from "../FormDateAndTimeInputs/FormDateAndTimeInputs";
import FormMembersInput from "../FormMembersInput/FormMembersInput";
import FormRooms from "../FormRooms/FormRooms";
import { MeetingDeleteWarningPopUp } from "../MeetingDeleteWarningPopUp/MeetingDeleteWarningPopUp";

import { connect as formikConnect, Formik } from "formik";
import * as Yup from "yup";

import "./NewMeetingForm.css";
import { Header } from "../Header/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const EditMeetingForm_ = withRouter(
  formikConnect((props) => {
    const { initialValues, onSubmit } = props;

    const validate = (values) => {
      const errors = {};

      if (+values.startTime.slice(0, 2) < 8)
        errors.startTime = "Переговорка доступна с 8:00";
      if (+values.finishTime.slice(0, 2) < +values.startTime.slice(0, 2))
        errors.finishTime = "Конец совещания должен быть позже начала";

      return errors;
    };

    const validationSchema = Yup.object().shape({
      themeInput: Yup.string()
        .min(4, "Введите хотя бы 4 символа")
        .max(255, "Не более 255 символов")
        .required("Это обязательное поле!"),
      dateInput: Yup.string()
        .min(10, "Что-то про валидацию даты")
        .max(10, "Что-то про валидацию даты")
        .required("Это обязательное поле!"),
      selectedRoom: Yup.string().required("Это обязательное поле!"),
    });

    return (
      <div className="new-meeting-page">
        <Header />

        <main className="new-meeting-page-form-wrapper">
          <div className="new-meeting-form">
            <div className="new-meeting-page-form__header-wrapper">
              <h2 className="new-meeting-page-form__header">Новая встреча</h2>
              <button
                className="new-meeting-page-form__close-tab-btn"
                onClick={() => props.history.push("/")}
              >
                Закрыть вкладку
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validate={validate}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                setTimeout(() => {
                  onSubmit(values);
                  resetForm({});
                  setSubmitting(false);
                  props.history.push("/");
                }, 1000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} className="new-meeting-page-form">
                  <div className="new-meeting-page-form__inner">
                    <FormThemeInput />
                    <FormDateAndTimeInputs />
                    <FormMembersInput
                      setSelectedMembers={(value) =>
                        setFieldValue("selectedMembers", value)
                      }
                      selectedMembers={values.selectedMembers}
                    />
                    <FormRooms
                      setSelectedRoom={(value) =>
                        setFieldValue("selectedRoom", value)
                      }
                      selectedRoom={values.selectedRoom}
                    />
                  </div>

                  <div className="new-meeting-page-form-inner__submit">
                    <button
                      className="btn-text-grey"
                      type="button"
                      onClick={() => props.history.push("/")}
                    >
                      Отмена
                    </button>
                    <button
                      className="btn-text-blue"
                      type="button"
                      onClick={() => props.deleteWarning()}
                    >
                      Удалить
                    </button>
                    <button
                      className="btn-text-grey"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </main>
        {props.meetingDeleteWarningPopUp ? <MeetingDeleteWarningPopUp /> : null}
      </div>
    );
  })
);

const mapStateToProps = ({ meetingDeleteWarningPopUp }) => ({
  meetingDeleteWarningPopUp,
});

const mapDispatchToProps = (dispatch) => ({
  deleteWarning: () => {
    dispatch({ type: "DELETE_WARNING" });
  },
});

export const EditMeetingForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMeetingForm_);
