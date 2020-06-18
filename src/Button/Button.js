import React from "react";

import { Link } from "react-router-dom";

export const Button = ({ classes, title }) => {
  return (
    <button className={classes}>
      <Link to="/newmeetingform" style={{ color: "#fff" }}>
        {title}
      </Link>
    </button>
  );
};
