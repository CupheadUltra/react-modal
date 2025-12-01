import React, {Component} from 'react';
import Modal from "./components/Modal"
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return(
      <div style={{padding: '40px'}}>
       <h1>Модальне вікно</h1>
      <Modal/>
      </div>
    )
  }
}

export default App;
