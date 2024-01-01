// Dropdown.js
import React from "react";
import PropTypes from "prop-types";
import stat from "./stat.svg";
import styles from "./dropdown.module.css";

const Dropdown = ({ options, selectedValue, onSelect }) => {
  return (
    <div className={styles.dropdown}>
      <select
        value={selectedValue}
        onChange={(e) => onSelect(e.target.value)}
        className={styles.customDropdown}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className={styles.customDropdownOptions}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={styles.dropdownIcon}>
        <svg
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path id="Vector" d="M0 0L5 5L10 0H0Z" fill="black" />
        </svg>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
