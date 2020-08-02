import React from "react";
import './TypeInput.css';

function typeInput(props, ref) {
  let classes = ['type-input'];

  if(props.invalid) {
    classes.push('invalid')
  }

  return (
    <div className={classes.join(' ')}>
      <input ref={ref} onChange={props.changed} value={props.currentWord} type="text" autoFocus={true} />
    </div>
  );
}

export default React.forwardRef(typeInput);