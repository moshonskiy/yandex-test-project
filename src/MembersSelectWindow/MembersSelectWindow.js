import React from "react";

import { membersData } from "../resources/commonVariables/membersData";

import "./MembersSelectWindow.css";

export const MembersSelectWindow = ({ handleSelectedMember, membersInput }) => {
  const filterMembersByInput = membersData.filter(
    ({ memberName }) =>
      memberName.toLowerCase().indexOf(membersInput.toLowerCase()) > -1
  );
  const members =
    filterMembersByInput.length > 0 && membersInput !== ""
      ? filterMembersByInput
      : membersData;

  const membersSelectList = members.map(({ id, memberName, memberFloor }) => (
    <li
      key={id}
      className="meeting-members-select__item"
      onMouseDown={() => {
        handleSelectedMember(id);
      }}
    >
      <img
        src="#"
        alt="member to select"
        className="meeting-members-select__member-logo"
      />
      <span className="meeting-members-select__member-name">{memberName}</span>
      <span className="meeting-members-select__member-floor">
        {memberFloor}
      </span>
    </li>
  ));

  return (
    <div className="meeting-members-select-wrapper">
      <ul className="meeting-members-select">{membersSelectList}</ul>
    </div>
  );
};
