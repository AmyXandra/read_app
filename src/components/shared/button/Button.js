import React from 'react';

const Button = ({ buttonText, clicked, disabled, classNames, buttonType }) => {
  return (
    <button type={buttonType} onClick={clicked} disabled={disabled} className={classNames}>
      {buttonText}
    </button>
  );
};

export default Button;
