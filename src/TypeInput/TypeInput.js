import React from "react";
import './TypeInput.css';

function typeInput(props) {
  let classes = ['type-input'];

  if(props.invalid) {
    classes.push('invalid')
  }

  return (
    <div className={classes.join(' ')}>
      <input onChange={props.changed} value={props.currentWord} type="text"/>
    </div>
  );
}

export default typeInput;