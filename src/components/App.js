import React, { Component } from 'react'
import { initializeIcons } from '@uifabric/icons'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'

initializeIcons();

import MyHeader from './MyHeader'
import MyContent from './MyContent'
import MySidebar from './MySidebar'
import MyFooter from './MyFooter'

import '../sass/theme.scss'

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {isPanelOpen: false};
  }

  render() {
    return [
        <MyHeader key={1} showPanel={this._showPanel} />,
        <MyContent key={2} />,
        <MySidebar key={3} isOpen={this.state.isPanelOpen} />,
    ]
  }

  @autobind
  _showPanel(){
    this.setState({isPanelOpen: true })
  }
}
