import React, {Component} from 'react'

import Button from '../Bouton'

import styles from './Header.scss'

export default class Header extends Component<null, null>{

    render() {
      return (
        <header className={styles.header}>
            <h1>React Encoder</h1>
            <nav>
                <Button title="Add a video to the queue" icon="add" />
                <Button title="Settings" icon="settings" />
            </nav>
        </header>
      )
    }
}