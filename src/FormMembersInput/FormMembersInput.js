import React, { useState } from "react";

import { MembersSelectWindow } from "../MembersSelectWindow/MembersSelectWindow";
import SelectedMembers from "../SelectedMembers/SelectedMembers";
import { connect as formikConnect, ErrorMessage } from "formik";

import "./FormMembersInput.css";

const FormMembersInput = props => {
  const { selectedMembers, setSelectedMembers } = props;

  const [membersInput, setMembersInput] = useState("");
  const [membersInputFocus, setMembersInputFocus] = useState(false);
  const [arrowSpin, setArrowSpin] = useState(false);

  const handleSelectedMember = id => {
    if (!selectedMembers.includes(id)) {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleDeleteSelectedMember = id => {
    const newSelectedMembers = selectedMembers.filter(member => member !== id);
    setSelectedMembers(newSelectedMembers.length > 0 ? newSelectedMembers : "");
  };

  const handleChange = e => {
    setMembersInput(e.target.value);
  };

  const handleFocus = e => {
    setMembersInputFocus(true);
    setArrowSpin(true);
  };

  const handleBlur = e => {
    setMembersInputFocus(false);
    setArrowSpin(false);
  };

  const handleArrowSpin = () => {
    setArrowSpin(!arrowSpin);
    arrowSpin ? setMembersInputFocus(false) : setMembersInputFocus(true);
  };

  return (
    <div className="new-meeting-page-form__members-wrapper">
      <div className="new-meeting-page-form__members">
        <h3 className="new-meeting-page-form__input-header">Участники</h3>
        <input
          type="text"
          id="membersInput"
          placeholder="Smth"
          name="membersInput"
          value={membersInput}
          className={"new-meeting-page-form__members-input"}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span
          className={
            arrowSpin
              ? "new-meeting-page-form__members-input-arrow arrow-spinning-forwards"
              : "new-meeting-page-form__members-input-arrow arrow-spinning-backwards"
          }
          htmlFor="membersInput"
          onClick={handleArrowSpin}
        >
          spinning arrow
        </span>
        <ErrorMessage
          name="selectedMembers"
          render={() => (
            <span className="required-field">
              {props.formik.errors.selectedMembers}
            </span>
          )}
        />
      </div>
      {membersInputFocus ? (
        <MembersSelectWindow
          handleSelectedMember={handleSelectedMember}
          membersInput={membersInput}
        />
      ) : null}
      {selectedMembers.length >= 1 ? (
        <SelectedMembers
          selectedMembers={selectedMembers}
          handleDeleteSelectedMember={handleDeleteSelectedMember}
        />
      ) : null}
    </div>
  );
};

export default formikConnect(FormMembersInput);
