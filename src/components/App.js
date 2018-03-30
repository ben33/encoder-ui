import React, { Component } from 'react'
import axios from 'axios'
import { hot } from 'react-hot-loader'
import { initializeIcons } from '@uifabric/icons'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { subscribeToEncoder, subscribeToQueue } from './socket'

initializeIcons();

import MyHeader from './MyHeader'
import MyContent from './MyContent'
import MySidebar from './MySidebar'
import MyFooter from './MyFooter'

import '../sass/theme.scss'

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isPanelOpen: false,
      encoder: {
        status: 'stopped'
      },
      queue: []
    };
  }

  componentDidMount() {

    subscribeToEncoder(encoder => {
      this.setState({ encoder })
    })

    subscribeToQueue(queue => {
      this.setState({ queue })
    })

    this._getEncoder()
    this._getQueue()
  }

  render() {
    return [
      <MyHeader key={1} showPanel={this._showPanel} />,
      <MyContent key={2} encoder={this.state.encoder} queue={this.state.queue} startEncoder={this._startEncoder} />,
      <MySidebar key={3} isOpen={this.state.isPanelOpen} addToQueue={this._addToQueue} close={this._hidePanel} />,
    ]
  }

  @autobind
  _addToQueue({ video, options }, cb) {
    axios.post(`http://localhost:8081/queue`, {
      element: {
        video,
        options
      }
    }).then(() => {
      cb();
    })
      .catch((error) => {

      })
  }

  @autobind
  _startEncoder(video) {
    axios.post(`http://localhost:8081/encoder`, {
      element: {
        video
      }
    })
      .catch((error) => {

      })
  }

  _getEncoder() {
    axios.get(`http://localhost:8081/encoder`).then((res) => {
      this.setState({
        encoder: res.data
      })
    })
      .catch((error) => {

      })
  }

  _getQueue() {
    axios.get(`http://localhost:8081/queue`).then((res) => {
      this.setState({
        queue: res.data
      })
    })
      .catch((error) => {

      })
  }

  @autobind
  _hidePanel() {
    this.setState({ isPanelOpen: false })
  }

  @autobind
  _showPanel() {
    this.setState({ isPanelOpen: true })
  }
}

export default hot(module)(App)
