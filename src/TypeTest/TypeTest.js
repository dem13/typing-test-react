import React, {Component} from "react";
import './TypeTest.css';

import TypeText from "./TypeText/TypeText";
import TypeInput from "./TypeInput/TypeInput";

class TypeTest extends Component {
  state = {
    started: false,
    currentWord: '',
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

    this.typeInputRef = React.createRef();

    this.state.remainingText = this.generateTextToType();
  }

  generateTextToType = () => {
    //TODO: Randomly generate text
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
  };

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
      remainingText: this.generateTextToType(),
      finishedText: '',
      invalidWord: false,
      time: 0,
      stopwatchInterval: null,
      result: null
    });

    this.typeInputRef.current.focus();
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

    if (this.state.remainingText !== '') {
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
        result = this.computeResult(finishedText, this.state.time);
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
        <div className="info-wrapper">
          <div className="info">
            {this.state.time === 0 ? "Start typing the text below" : (this.state.time / 100).toFixed(1) + " seconds"}
          </div>
          <div className="info">
            {this.state.result !== null ? (this.state.result / 5).toFixed(0) : "Your "}WPM
          </div>
        </div>

        <TypeText currentWord={this.state.currentWord} finishedText={this.state.finishedText}
                  remainingText={this.state.remainingText}/>

        <TypeInput
          invalid={this.state.invalidWord}
          changed={this.currentWordChangedHandler}
          currentWord={this.state.currentWord}
          ref={this.typeInputRef}/>

        <div className="control">
          <button className="btn" onClick={this.restartClickHandler}>Restart</button>
        </div>
      </div>
    )
  }
}

export default TypeTest;