// src/CheckboxWithLabel.jsx

import { useState } from "react";
import PropTypes from "prop-types";

export function CheckboxWithLabel({ labelOn, labelOff }) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}

CheckboxWithLabel.propTypes = {
  labelOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
};
