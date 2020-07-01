import React from "react";
import './TypeText.css';


function typeText(props) {
  let classes = ['type-text'];
  let wordClasses = ['remaining-word'];


  let remainingWords = props.remainingText.split(' ');

  let currentWord = props.currentWord;
  let firstWord = remainingWords.shift();
  let remainingWord = firstWord.substring(props.currentWord.length);
  let error = firstWord.startsWith(currentWord) ? false : true;


  // console.log(remainingWord);

  if (props.remainingText === '') {
    classes.push('finished');
  }

  if (error) {
    remainingWord = ' ' + firstWord  + ' ';
    currentWord = '';
    wordClasses.push('invalid-word');
  } else {
    if (currentWord === '') {
      remainingWord = ' ' + remainingWord + ' ';
    } else if (remainingWord === '') {
      currentWord = ' ' + currentWord + ' ';
    } else {
      currentWord = ' ' + currentWord;
      remainingWord += ' ';
    }
  }

  return (
    <div className={classes.join(' ')}>
      <span className="finished-text">{props.finishedText}</span>
      <span className="current-word">{currentWord}</span>
      <span className={wordClasses.join(' ')}>{remainingWord}</span>
      <span className="remaining-text">{remainingWords.join(' ')}</span>
    </div>
  );
}

export default typeText;