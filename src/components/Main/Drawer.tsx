import React, {Component} from 'react'

import styles from './Drawer.scss'

interface Props {
    videos: Array<Video>
}

export default class Drawer extends Component<Props, any> {

    render() {
      return (
          <aside className={styles.drawerRight}>
              Drawer droit
          </aside>
      )
    }
}