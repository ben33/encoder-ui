import React, { Component } from 'react'
import axios from 'axios'
import { isEqual } from 'lodash'

import VideoPreview from './VideoPreview'
import VideoInfos from './VideoInfos'

import styles from '../sass/Video'

export default class Video extends Component {

    constructor(props) {
        super(props)

        this.state = {
            codecs: null
        }
    }
    
    componentDidMount() {
        this.fetchCodecs()
    }

    fetchCodecs(video) {
        axios.get(`http://localhost:8081/settings/codecs`)
            .then(res => {
                this.setState({ codecs: res.data })
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const languages = [{ key: 'fre', text: 'Français' }, { key: 'eng', text: 'English' }]
        const { video } = this.props
        const { codecs } = this.state

        return codecs ? [
            <VideoPreview video={video} />,
            <VideoInfos {...this.props} video={video} codecs={codecs} languages={languages} />
        ] : null
    }
}
