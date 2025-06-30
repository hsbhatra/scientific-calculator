import React from 'react';
import styles from '../styles/Button.module.css';

// Reusable button component
// It triggers the passed `onClick` function when clicked
const Button = ({ label, onClick, type = 'default' }) => {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
