import React, { Component } from 'react'
import electron, { remote, ipcRenderer } from "electron";
import { greet } from "./hello_world/hello_world";
import jetpack from "fs-jetpack";
import env from "env";

const dialog = remote.dialog

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filepath: ''
    }
  }

  handleClick = () => {
    dialog.showOpenDialog((fileNames) => {
      if (fileNames) {
        this.setState({
          filepath: fileNames[0]
        })
      }
    })
  }

  componentDidMount() {
    ipcRenderer.on('open-file', (evt, fileNames) => {
      this.setState({
        filepath: fileNames[0]
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div id="app" className="container">
          <h1 id="greet">{greet()}</h1>
          <p>
            Welcome to <a href="http://electron.atom.io" className="js-external-link">Electron</a> app running on this <strong id="os">{osMap[process.platform]}</strong> machine.
          </p>
          <p>
            App author: <strong id="author">{manifest.author}</strong>
          </p>
          <p>
            Environment: <strong id="env">{env.name}</strong>
          </p>
          <p>
            Electron version: <strong id="electron-version">{process.versions.electron}</strong>
          </p>
          {
            this.state.filepath
              ? this.state.filepath
              : <button onClick={this.handleClick}>Open File</button>
          }
        </div>
      </div>
    )
  }
}

export default App
