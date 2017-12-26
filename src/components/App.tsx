import React, {Component} from 'react'

import Header from './Header'
import Main from './Main'

import styles from './App.scss'

export default class App extends Component {

    render() {
      return (
        <section className={styles.app}>
            <Header key="A" />
            <Main key="B" />
        </section>
      )
    }
}