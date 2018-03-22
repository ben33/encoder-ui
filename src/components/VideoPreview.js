import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import styles from '../sass/VideoPreview'

export default class VideoPreview extends Component {

    render() {
        const { video } = this.props

        return (
            <div className={styles.preview}>
                <ReactPlayer
                    url={`http://localhost:8081${video}`}
                    controls
                />
            </div>
        )
    }
}
