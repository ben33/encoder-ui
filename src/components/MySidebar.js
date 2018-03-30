import React, { Component } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'

import Formulaire from './Formulaire'

export default class MySidebar extends Component {
    render() {
        const {isOpen} = this.props
        return (
            <Panel
                isOpen={isOpen}
                type={PanelType.largeFixed}
            >
                <Formulaire {...this.props} />
            </Panel>
        )
    }
}
