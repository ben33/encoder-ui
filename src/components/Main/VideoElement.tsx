import React, {Component} from 'react'

import Button from '../Bouton'
import ProgressBar from '../ProgressBar'

import styles from './VideoElement.scss'

interface Props {
    video: Video
}

export default class VideoElement extends Component<Props, any>{

    render() {
      const {video, encoder} = this.props
    encoder.progress = 50
      return (
        <li className={styles.element}>
            <Button icon='featured_video' text={video.file} />
            <div className={styles.action}>
            {!encoder.isProcessing && !video.isProcessing && <Button title='Launch' icon='play_arrow' />}
            {encoder.isProcessing && video.isProcessing && <Button title='Pause' icon='pause' />}
            {!video.isProcessing && <Button title='Remove from queue' icon='delete' />}
            </div>
            {encoder.isProcessing && video.isProcessing && <ProgressBar progress={encoder.progress} />}
        </li>
      )
    }
}