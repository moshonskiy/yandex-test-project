import React from "react";

import FormThemeInput from "../FormThemeInput/FormThemeInput";
import FormDateAndTimeInputs from "../FormDateAndTimeInputs/FormDateAndTimeInputs";
import FormMembersInput from "../FormMembersInput/FormMembersInput";
import FormRooms from "../FormRooms/FormRooms";

import { getCurrentTime } from "../resources/functionHelpers/getCurrentTime";

import { connect as formikConnect, Formik } from "formik";
import * as Yup from "yup";

import "./NewMeetingForm.css";
import { Header } from "../Header/Header";
import { withRouter } from "react-router-dom";

export const NewMeetingForm = withRouter(
  formikConnect(props => {
    const { initialValues, onSubmit } = props;

    const currentHour = +getCurrentTime().slice(0, 2);
    const currentMinutes = +getCurrentTime().slice(3);
    console.log(getCurrentTime());

    const validate = values => {
      const errors = {};

      if (values.themeInput.length === 0)
        errors.themeInput = "Это обязательное поле!";
      if (currentHour < 8) errors.startTime = "Переговорки доступны с 8:00";
      if (
        +values.startTime.slice(0, 2) < 8 ||
        +values.startTime.slice(0, 2) === ""
      )
        errors.startTime = "Переговорки доступны с 8:00";
      if (!values.finishTime) errors.finishTime = "Это обязательное поле!";
      if (
        +values.finishTime.slice(0, 2) > 0 &&
        +values.finishTime.slice(0, 2) < +values.startTime.slice(0, 2)
      )
        errors.finishTime = "Конец должен быть позже начала";
      if (values.selectedMembers.length === 0)
        errors.selectedMembers = "Выберите участника";
      if (
        values.startTime.slice(0, 2) !== "" &&
        +values.startTime.slice(0, 2) <= currentHour &&
        +values.startTime.slice(3) < currentMinutes
      )
        errors.startTime = "Время прошло";
      if (
        +values.finishTime.slice(0, 2) <= 7 &&
        +values.finishTime.slice(3) <= 59
      )
        errors.finishTime = "Переговорки доступны до 23:59";
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
      selectedRoom: Yup.string().required("Это обязательное поле!")
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
              onSubmit={(
                values,
                { setSubmitting, resetForm }
              ) => {
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
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit} className="new-meeting-page-form">
                  <div className="new-meeting-page-form__inner">
                    <FormThemeInput />
                    <FormDateAndTimeInputs />
                    <FormMembersInput
                      setSelectedMembers={value =>
                        setFieldValue("selectedMembers", value)
                      }
                      selectedMembers={values.selectedMembers}
                    />
                    <FormRooms
                      setSelectedRoom={value =>
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
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Создать встречу
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    );
  })
);
