import React, {Component} from "react";
import './TypeTest.css';

import TypeText from "./TypeText/TypeText";
import TypeInput from "./TypeInput/TypeInput";

class TypeTest extends Component {
  state = {
    started: false,
    currentWord: '',
    text: 'this is text to type, enjoy!',
    remainingText: null,
    finishedText: '',
    invalidWord: false,
    time: 0,
    stopwatchInterval: null,
    result: null,
    accuracy: 1
  };

  constructor(props) {
    super(props);

    this.state.remainingText = this.state.text;
  }

  startGame = () => {
    this.setState({
      started: true,
      time: 0,
      stopwatchInterval: setInterval((time) => {
        this.setState({time: ++this.state.time})
      }, 10)
    });
  };

  restartClickHandler = () => {
    clearInterval(this.state.stopwatchInterval);

    this.setState({
      started: false,
      currentWord: '',
      remainingText: this.state.text,
      finishedText: '',
      invalidWord: false,
      time: 0,
      stopwatchInterval: null,
      result: null
    });
  };

  computeResult(text, time) {
    return 6000 * text.length / time;
  }


  currentWordChangedHandler = (e) => {
    if (!this.state.started) {
      this.startGame()
    }

    let currentWord = e.target.value;
    let remainingText = this.state.remainingText;
    let finishedText = this.state.finishedText;
    let result = this.state.result;
    let invalidWord = false;

    let words = [];

    if(this.state.remainingText !== '') {
      words = this.state.remainingText.split(' ');
    }

    const isLastWord = words.length === 1;

    if (currentWord[currentWord.length - 1] === ' ' || isLastWord) {
      let word = isLastWord ? currentWord : currentWord.substring(0, currentWord.length - 1);

      if (words[0] === word) {
        finishedText = finishedText + " " + words[0];
        words.splice(0, 1);
        remainingText = words.join(' ');
        currentWord = '';
      }
    }

    if (words.length === 0) {
      if (this.state.stopwatchInterval !== null) {
        clearInterval(this.state.stopwatchInterval);
      }

      result = this.computeResult(finishedText, this.state.time);
    } else {
      if (!words[0].startsWith(currentWord)) {
        invalidWord = true;
      }
    }

    this.setState({currentWord, remainingText, finishedText, invalidWord, result})
  };

  render() {
    return (
      <div className="type-test">
        <TypeText currentWord={this.state.currentWord} finishedText={this.state.finishedText} remainingText={this.state.remainingText}/>
        {this.state.remainingText.length === 0 ? <div>{(this.state.result / 5).toFixed(2)}WPM</div> : null}
        <div className="timer">
          {(this.state.time / 100).toFixed(1)}
        </div>

        <TypeInput
          invalid={this.state.invalidWord}
          changed={this.currentWordChangedHandler}
          currentWord={this.state.currentWord}/>

        <div className="control">
          <button onClick={this.restartClickHandler}>Restart</button>
        </div>
      </div>
    )
  }
}

export default TypeTest;