import React from "react";

import { connect } from "formik";
import { membersData } from "../resources/commonVariables/membersData";

import "./SelectedMembers.css";

const SelectedMembers = props => {
  const selectedMembersToRender = props.selectedMembers.map(id => {
    const { memberName } = membersData.find(member => {
      if (member.id === id) return member.memberName;
    });

    return (
      <div key={id} className="members-selected-wrapper__item">
        <img
          src={id}
          alt="member-logo"
          className="members-selected-wrapper__member-logo"
        />
        <span className="members-selected-wrapper__member-name">
          {memberName}
        </span>
        <button
          className="members-selected-wrapper__member-delete-btn"
          type="button"
          onClick={() => props.handleDeleteSelectedMember(id)}
        >
          delete item
        </button>
      </div>
    );
  });

  return (
    <div className="members-selected-wrapper">{selectedMembersToRender}</div>
  );
};

export default connect(SelectedMembers);
