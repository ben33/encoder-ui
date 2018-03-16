import React, { Component } from 'react'
import { Image, ImageFit, CommandBar } from 'office-ui-fabric-react'

import styles from '../sass/MyHeader'

export default class MyHeader extends Component {

  render() {
    const {showPanel} = this.props
    return (
      <header className={styles.header}>
        <h1 className={styles.h1}>
          <Image src="/src/images/logo.png" height={36} className={styles.logo} />
          <span>Encoder</span>
        </h1>
        <CommandBar
          elipisisAriaLabel='More options'
          items={ [
            {
              key: 'newItem',
              name: 'Nouveau',
              iconProps: {
                iconName: 'Add',
              },
              onClick: showPanel
            }
          ] }
        />
      </header>
    )
  }
}
