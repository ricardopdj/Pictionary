import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import API from './API.js'
import { FaRegPlayCircle, FaPauseCircle } from 'react-icons/fa'
import logo from './assets/logo.png'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      empty: true,
      word: 'give me a word',
      isLoading: false,
      isRunning: false,
      progressWidth: 0
    }
    this.countDown = null
    this.getWord = this.getWord.bind(this)
  }

  startCountDown = () => {
    this.setState({ isRunning: true })

    this.countDown = setInterval(() => {
      this.setState(prevState => ({
        progressWidth: prevState.progressWidth + 1
      }))
      if (this.state.progressWidth === 100) {
        this.setState({ isRunning: false })
        clearInterval(this.countDown)
      }
    }, 600)
  }

  pauseCountDown = () => {
    clearInterval(this.countDown)
    this.setState({ isRunning: false })
  }

  async getWord () {
    if (this.state.isRunning) {
      return false
    }
    this.setState({ isLoading: true, progressWidth: 0 })
    const result = await API.get()
    console.log(result)

    this.setState({
      word: result.data.entry.form.orth,
      empty: false,
      isLoading: false
    })
  }

  render () {
    return (
      <div className="App">
        <img src={logo} alt="Logo" />
        <div className="content">
          <button
            className={`btn btn-primary btn-lg ${
              this.state.empty ? 'empty' : 'filled'
            }`}
            id="btn-word"
            onClick={this.getWord}
          >
            {this.state.isLoading ? (
              <div
                className="spinner-border"
                role="status"
                style={{ width: '3rem', height: '3rem', fontSize: '10px' }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <span>{this.state.word}</span>
            )}
          </button>
          <div className="progress">
            <div
              className={'progress-bar'}
              style={{ width: this.state.progressWidth + '%' }}
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="progress-time">
            <span>0"</span>
            <span>15"</span>
            <span>30"</span>
            <span>45"</span>
            <span>60"</span>
          </div>

          <div className="control">
            {/* <FaRedoAlt /> */}
            {this.state.isRunning ? (
              <FaPauseCircle
                onClick={this.pauseCountDown}
                className="playpause"
              />
            ) : (
              <FaRegPlayCircle
                onClick={this.startCountDown}
                className="playpause"
              />
            )}
            {/* <span className="btn-lang">EN</span> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App
