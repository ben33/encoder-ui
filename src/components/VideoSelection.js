import React, { Component } from 'react'
import axios from 'axios'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dialog, DialogType, DialogFooter,IDialogContentProps } from 'office-ui-fabric-react/lib/Dialog'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { DetailsList, SelectionMode, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'

import Video from './Video'

import styles from '../sass/VideoSelection'

export default class VideoSelection extends Component {

    constructor(props) {
        super(props)

        const columns = [
            {
                key: 'name',
                isRowHeader: false,
                isResizable: false,
                minWidth: 150,
                maxWidth: 150,
                data: 'string',
                onRender: (file) => {
                    let iconName = file.isDirectory ? 'FolderOpen' : 'Video'
                    return (
                        <ActionButton
                            text={file.name}
                            iconProps={{iconName}}
                            className={styles.elementList}
                            onClick={() => {
                                if(file.isDirectory){
                                    this.addToHistory(this.state.path)
                                    this.fetch(this.state.path + file.name + '/')
                                }else{
                                    this.selectFile(file)
                                }
                            }}
                        />
                    )
                }
            }
        ]

        this.state = {
            hideDialog: true,
            lastPath: [],
            path: '/',
            files: [],
            file: '',
            columns,
            video: ''
        }
    }

    componentDidMount() {
        this.fetch(this.state.path)
    }

    fetch(path) {        
        axios.get(`http://localhost:8081/fs?path=${path}`)
            .then(res => {
                const files = res.data
                this.setState({ path, files })
            })
            .catch(error => {
                console.log(error)
            });
    }

    addToHistory(path) {
        this.setState(prevState => ({
            lastPath: [...prevState.lastPath, path]
        }))
    }

    selectFile(file){
        this.setState({
            file: file.path
        })
    }

    render() {
        const { files, columns, path, lastPath, video } = this.state

        return (
            <div>
                <PrimaryButton
                    text='Choisir la vidéo à encoder'
                    onClick={this._show}
                    className={styles.button}
                    iconProps={ { iconName: 'Video' } }
                />
                {
                    video && 
                        <Video video={video} />
                }
                <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this._close}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        title: 'Vidéo à encoder',
                    }}
                    modalProps={{
                        isBlocking: true,
                        containerClassName: 'ms-dialogMainOverride'
                    }}
                >
                    {
                        lastPath.length>0 &&
                        <ActionButton
                            iconProps={{ iconName: 'PageLeft' }}
                            onClick={() => {
                                this.fetch(lastPath[lastPath.length - 1])
                                this.setState(prevState => ({
                                    lastPath: prevState.lastPath.slice(0, -1)
                                }))
                            }}
                        />
                    }
                    <DetailsList
                        items={files}
                        className={styles.files}
                        compact={true}
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        setKey='files'
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={false}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={this._validate} text='Valider' />
                        <DefaultButton onClick={this._close} text='Annuler' />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }

    @autobind
    _show() {
        this.setState({ hideDialog: false });
    }

    @autobind
    _validate() {
        this.setState({ 
            hideDialog: true,
            video: this.state.file 
        });
    }

    @autobind
    _close() {
        this.setState({ hideDialog: true });
    }
}
