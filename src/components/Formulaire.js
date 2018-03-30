import React, { Component } from 'react'

import VideoSelection from './VideoSelection'

import styles from '../sass/Formulaire'

export default class Formulaire extends Component {
    render() {
        return (
            <form className={styles.form}>
                <VideoSelection {...this.props} />
            </form>
        )
    }
}
