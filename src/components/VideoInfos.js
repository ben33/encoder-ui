import React, { Component } from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import filesize from 'filesize'
import PrettifyTime from 'prettify-time'

import styles from '../sass/VideoInfos'

export default class VideoInfos extends Component {

    render() {
        const { video, infos, codecs, languages, options, _onControlledCheckboxChange, _onControlledDropdownChange, _onControlledLanguageDropdownChange } = this.props
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
                                label={'[' + piste.index + (piste.id ? ':' + piste.id : '') + ']: ' + piste.codec}
                                checked={(options[piste.index] ? true :false)}
                                onChange={ () => _onControlledCheckboxChange(piste) }
                            />
                            <Dropdown
                                dropdownWidth={150}
                                disabled={!options[piste.index]}
                                selectedKey={ (options[piste.index] ? options[piste.index].encoding : 'copy') }
                                options={[{key: 'copy', text: 'copy'}, ...codecs.video]}
                                onChanged={ (item) => _onControlledDropdownChange(piste.index, item.key, (item.defaultOptions ? item.defaultOptions : {})) }
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
                                label={'[' + piste.index + (piste.id ? ':' + piste.id : '') + ']: ' + piste.language + ' / ' + piste.codec + ' / ' + piste.channel}
                                checked={(options[piste.index] ? true :false)}
                                onChange={ () => _onControlledCheckboxChange(piste) }
                            />
                            <Dropdown
                                dropdownWidth={150}
                                disabled={!options[piste.index]}
                                selectedKey={ (options[piste.index] ? options[piste.index].encoding : 'copy') }
                                options={[{key: 'copy', text: 'copy'}, ...codecs.audio]}
                                onChanged={ (item) => _onControlledDropdownChange(piste.index, item.key, (item.defaultOptions ? item.defaultOptions : {})) }
                            />
                            {!piste.language ?
                                <Dropdown
                                    dropdownWidth={150}
                                    disabled={!options[piste.index]}
                                    selectedKey={ (options[piste.index] ? options[piste.index].language : '') }
                                    options={languages}
                                    onChanged={ (item) => _onControlledLanguageDropdownChange(piste.index, item.key) }
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
                                label={'[' + piste.index + (piste.id ? ':' + piste.id : '') + ']: ' + piste.language}
                                checked={(options[piste.index] ? true :false)}
                                onChange={ () => _onControlledCheckboxChange(piste) }
                            />
                            <div />
                            {!piste.language ?
                                <Dropdown
                                    dropdownWidth={150}
                                    disabled={!options[piste.index]}
                                    selectedKey={ (options[piste.index] ? options[piste.index].language : '') }
                                    options={languages}
                                    onChanged={ (item) => _onControlledLanguageDropdownChange(piste.index, item.key) }
                                /> : <div />
                            }
                        </li>
                    )}
                </ul>
            </div>
        ]
    }
}
