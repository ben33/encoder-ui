import React, { Component } from 'react'

import styles from './Bouton.scss'

interface Props {
  title?: string
  text?: string
  clickHandler: any
  icon?: string
  disabled?: boolean
}

export default class Bouton extends Component<Props, any> {

  render () {
    const {icon, text, title, clickHandler, disabled} = this.props

    return (
      <button title={title} className={styles.bouton} onClick={clickHandler} disabled={disabled}>
        {icon &&
          <i className={styles.icone}>{icon}</i>
        }
        {
            text && 
                <span>{text}</span>
        }
      </button>
    )
  }
}
