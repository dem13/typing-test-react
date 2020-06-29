import React from "react";
import './TypeInput.css';

function typeInput(props) {
  return (
    <div className="type-input">
      <input onChange={props.changed} value={props.currentWord} type="text"/>
    </div>
  );
}

export default typeInput;