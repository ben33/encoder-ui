import React, {Component} from 'react'

import Queue from './Queue'
import Drawer from './Drawer'

import styles from './Main.scss'

export default class Main extends Component {

    render() {
      const videos = [{file: 'test.mkv', isProcessing: false}]
      const encoder = {isProcessing: false}
      return (
          <main className={styles.main}>
              <Queue videos={videos} encoder={encoder} />
              <Drawer />
          </main>
      )
    }
}