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
            infos: null,
            codecs: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.video !== nextProps.video) {
            return true
        }
        if (!isEqual(this.state.infos, nextState.infos)) {
            return true
        }
        return false
    }

    componentDidMount() {
        this.fetchInfos(this.props.video)
        this.fetchCodecs()
    }

    componentDidUpdate() {
        this.fetchInfos(this.props.video)
    }

    fetchInfos(video) {
        axios.get(`http://localhost:8081/videos/${video}`)
            .then(res => {
                this.setState({ infos: res.data })
            })
            .catch(error => {
                console.log(error)
            });
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
        const languages = [{key: 'fre', text: 'Français'}, { key: 'eng', text: 'English' }]
        const { video } = this.props
        const { infos, codecs } = this.state

        if (infos) {
            return [
                <VideoPreview video={video} />,
                <VideoInfos video={video} infos={infos} codecs={codecs} languages={languages} />
            ]
        }
return null
    }
}
