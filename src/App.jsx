import React, { Component } from 'react'
import electron, { remote } from "electron";

const dialog = remote.dialog

class App extends Component {

  constructor(props) {
    super(props)
  }

  handleClick = () => {
    dialog.showOpenDialog((fileNames) => {
      console.log(fileNames)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">git note</h1>
        </header>
        <button onClick={this.handleClick}>Open</button>
      </div>
    )
  }
}

export default App
