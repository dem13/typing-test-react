import React, {Component} from 'react';
import './App.css';
import TypeInput from './TypeInput/TypeInput';

class App extends Component {
  state = {
    currentWord: 'Hey',
  };

  currentWordChangedHandler = (e) => {
    this.setState({currentWord: e.target.value})
  };

  render() {
    return (
      <div className="App">
        <TypeInput
          changed={this.currentWordChangedHandler}
          currentWord={this.state.currentWord}/>
        <p>{this.state.currentWord}</p>
      </div>
    )
  }
}

export default App;
