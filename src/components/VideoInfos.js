import React, { Component } from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import filesize from 'filesize'
import PrettifyTime from 'prettify-time'

import styles from '../sass/VideoInfos'

export default class VideoInfos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selection: {}
        }
    }

    render() {
        const { video, infos, codecs, languages } = this.props
        const { selection } = this.state
        return [
            <div>
                <Icon iconName='OpenFile' />{video}
            </div>,
            <div>Taille de la vidéo : {filesize(infos.size)}</div>,
            <div>Durée de la vidéo : {PrettifyTime.secondsToDuration(infos.duration, ['h', 'm', 's']).totalTime}</div>,
            <div>
                Pistes vidéo :
                    <ul className={styles.list}>
                    {infos.video.map(piste =>
                        <li>
                            <Checkbox
                                label={'[' + piste.index + ']: ' + piste.codec}
                                checked={selection[piste.index]}
                                onChange={ () => this._onControlledCheckboxChange(piste.index) }
                            />
                            <Dropdown
                                dropdownWidth={150}
                                disabled={!selection[piste.index]}
                                selectedKey={ (selection[piste.index] ? selection[piste.index].encoding : 'copy') }
                                options={[{key: 'copy', text: 'copy'}, ...codecs.video]}
                                onChanged={ (item) => this._onControlledDropdownChange(piste.index, item.key) }
                            />
                            <div />
                        </li>
                    )}
                </ul>
            </div>,
            <div>
                Pistes audio :
                <ul className={styles.list}>
                    {infos.audio.map(piste =>
                        <li>
                            <Checkbox
                                label={'[' + piste.index + ']: ' + piste.language + ' / ' + piste.codec + ' / ' + piste.channel}
                                checked={selection[piste.index]}
                                onChange={ () => this._onControlledCheckboxChange(piste.index) }
                            />
                            <Dropdown
                                dropdownWidth={150}
                                disabled={!selection[piste.index]}
                                selectedKey={ (selection[piste.index] ? selection[piste.index].encoding : 'copy') }
                                options={[{key: 'copy', text: 'copy'}, ...codecs.audio]}
                                onChanged={ (item) => this._onControlledDropdownChange(piste.index, item.key) }
                            />
                            {!piste.language ?
                                <Dropdown
                                    dropdownWidth={150}
                                    disabled={!selection[piste.index]}
                                    selectedKey={ (selection[piste.index] ? selection[piste.index].language : languages[0].key) }
                                    options={languages}
                                    onChanged={ (item) => this._onControlledLanguageDropdownChange(piste.index, item.key) }
                                /> : <div />
                            }
                        </li>
                    )}
                </ul>
            </div>,
            <div>
                Sous-titres :
                    <ul className={styles.list}>
                    {infos.subtitle.map(piste =>
                        <li>
                            <Checkbox
                                label={'[' + piste.index + ']: ' + piste.language}
                                checked={selection[piste.index]}
                                onChange={ () => this._onControlledCheckboxChange(piste.index) }
                            />
                            <div />
                            {!piste.language ?
                                <Dropdown
                                    dropdownWidth={150}
                                    disabled={!selection[piste.index]}
                                    selectedKey={ (selection[piste.index] ? selection[piste.index].language : languages[0].key) }
                                    options={languages}
                                    onChanged={ (item) => this._onControlledLanguageDropdownChange(piste.index, item.key) }
                                /> : <div />
                            }
                        </li>
                    )}
                </ul>
            </div>
        ]
    }

    @autobind
    _onControlledCheckboxChange(index){
        let selection = Object.assign(this.state.selection, {});
        if(selection[index]){
            delete selection[index]
        }else{
            selection[index] = {encoding: 'copy'}
        }
        this.setState({
            selection
        })
    }

    @autobind
    _onControlledDropdownChange(index, value){
        let selection = Object.assign(this.state.selection, {});
        selection[index].encoding = value
        this.setState({
            selection
        })
    }

    @autobind
    _onControlledLanguageDropdownChange(index, value){
        let selection = Object.assign(this.state.selection, {});
        selection[index].encoding = value
        this.setState({
            selection
        })
    }
}
