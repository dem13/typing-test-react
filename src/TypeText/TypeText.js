import React from "react";
import './TypeText.css';


function typeText(props) {
  let classes = ['type-text'];

  if(props.remainingText === '') {
    classes.push('finished');
  }

  return (
    <div className={classes.join(' ')}>
      <span className="finished-text">{props.finishedText} </span>
      <span className="remaining-text">{props.remainingText}</span>
    </div>
  );
}

export default typeText;