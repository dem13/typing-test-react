import React, {Component} from 'react';
import './App.css';
import TypeInput from './TypeInput/TypeInput';
import TypeText from './TypeText/TypeText';


class App extends Component {
  state = {
    currentWord: '',
    remainingText: 'Google Compute Engine (GCE) is the Infrastructure as a Service (IaaS) component of Google Cloud Platform which is built on the global infrastructure that runs Google\'s search engine, Gmail, YouTube and other services. Google Compute Engine enables users to launch virtual machines (VMs) on demand. VMs can be launched from the standard images or custom images created by users. GCE users must authenticate based on OAuth 2.0 before launching the VMs. Google Compute Engine can be accessed via the Developer Console, RESTful API or command-line interface (CLI).',
    // remainingText: 'This is test text',
    finishedText: '',
    invalidWord: false,
  };

  currentWordChangedHandler = (e) => {
    let currentWord = e.target.value;
    let remainingText = this.state.remainingText;
    let finishedText = this.state.finishedText;
    let invalidWord = false;

    const words = this.state.remainingText.split(' ');

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
    } else {
      if(!words[0].startsWith(currentWord)) {
        invalidWord = true;
      }
    }

    this.setState({currentWord, remainingText, finishedText, invalidWord})
  };

  render() {
    return (
      <div className="App">
        <TypeText finishedText={this.state.finishedText} remainingText={this.state.remainingText}/>

        <TypeInput
          invalid={this.state.invalidWord}
          changed={this.currentWordChangedHandler}
          currentWord={this.state.currentWord}/>

      </div>
    )
  }
}

export default App;
