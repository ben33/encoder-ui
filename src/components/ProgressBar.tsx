import React, {Component} from 'react'

import styles from './ProgressBar.scss'

interface Props {
    progress: Number
}

export default class VideoElement extends Component<Props, any> {

    render() {
      const {progress} = this.props
      return (
        <div className={styles.progressBar}>
            <span>{progress}%</span>
            <div data-width={progress}></div>
        </div>
      )
    }
}