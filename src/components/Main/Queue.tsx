import React, {Component} from 'react'

import {getVideosFromQueue} from '../../actions/queue'
import VideoElement from './VideoElement'

import styles from './Queue.scss'

interface Props {
    videos: Array<Video>
}

export default class Queue extends Component<Props, any> {

    componentWillMount(){
        getVideosFromQueue()
    }

    render() {
        const {videos, ...props} = this.props
      return (
          <ul className={styles.queue}>{videos.map((video) => <VideoElement key={video.file} video={video} {...props} />)}</ul>
      )
    }
}