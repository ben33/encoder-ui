import React, { Component } from 'react'

import Queue from './Queue'

import styles from '../sass/MyContent'

export default class MyContent extends Component {
    render() {
        return (
            <section className={styles.content}>
                <Queue {...this.props} />
            </section>
        )
    }
}
