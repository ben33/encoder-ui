import React, { Component } from 'react'

import Queue from './Queue'

import styles from '../sass/MyContent'

export default class MyContent extends Component {
    render() {
        return (
            <section className={styles.content}>
                <Queue encoder={{ isProcessing: true, completion: { remainingTime: 3600, percent: 0.6 }, video: { input: 'test.mkv', output: 'test_encoded.mkv'} }} />
            </section>
        )
    }
}
