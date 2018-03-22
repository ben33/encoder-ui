import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { DetailsList, SelectionMode, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'

import styles from '../sass/Queue'

let _draggedItem = null

export default class Queue extends Component {

    constructor(props) {
        super(props)
        const { encoder } = props
        const videos = [{ input: 'test.mkv', output: 'test_encoded.mkv'}, { input: 'toto.mkv', output: 'toto_encoded.mkv' }, { input: 'toto2.mkv', output: 'toto_encoded2.mkv' }, { input: 'toto3.mkv', output: 'toto_encoded3.mkv' }]

        const columns = [
            {
                key: 'actions',
                name: '',
                minWidth: 160,
                maxWidth: 160,
                isPadded: true,
                onRender: (video) => {
                    return [
                        <ActionButton 
                            key={1}
                            iconProps={{ iconName: 'Info' }} 
                            onClick={() => alert('click Info ' + video.input)} 
                        />,
                        <ActionButton key={2} iconProps={{ iconName: 'Play' }} disabled={encoder.isProcessing} onClick={() => alert('click Play ' + video.input)} />,
                        <ActionButton key={3} iconProps={{ iconName: 'Pause' }} disabled={!encoder.isProcessing || !isEqual(encoder.video, video)} onClick={() => alert('click Pause ' + video.input)} />,
                        <ActionButton key={4} iconProps={{ iconName: 'Delete' }} disabled={encoder.isProcessing && isEqual(encoder.video, video)} onClick={() => alert('click Delete ' + video.input)} />
                    ]
                }
            },
            {
                key: 'input',
                name: 'Video à encoder',
                fieldName: 'input',
                isRowHeader: true,
                isResizable: true,
                minWidth: 100,
                maxWidth: 400,
                onColumnClick: this._onColumnClick,
                isPadded: true,
                data: 'string'
            },
            {
                key: 'output',
                name: 'Chemin de sortie',
                fieldName: 'output',
                isResizable: true,
                minWidth: 100,
                maxWidth: 400,
                onColumnClick: this._onColumnClick,
                isPadded: true,
                data: 'string'
            },
            {
                key: 'progress',
                name: 'Avancement',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true,
                onRender: (video) => {
                    return encoder.isProcessing && isEqual(encoder.video, video) ?
                        <ProgressIndicator
                            label={encoder.completion.percent * 100 + '%'}
                            description={encoder.completion.remainingTime}
                            percentComplete={encoder.completion.percent}
                        />
                        :
                        null
                },
                isPadded: true
            }
        ]
        
        this.state = {
            columns,
            videos
        }
    }

    render() {

        const { encoder } = this.props
        const { videos, columns } = this.state

        return [
            <DetailsList
                items={videos}
                compact={true}
                columns={columns}
                className={styles.queue}
                selectionMode={SelectionMode.none}
                setKey='set'
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onItemInvoked={this._onItemInvoked}
                dragDropEvents={this._getDragDropEvents()}
            />
        ]
    }

    @autobind
    _getDragDropEvents() {
        return {
            canDrop: (dropContext, dragContext) => true,
            canDrag: (item) => true,
            onDragEnter: (item, event) => 'dragEnter', // return string is the css classes that will be added to the entering element.
            onDragLeave: (item, event) => null,
            onDrop: (item, event) => {
                if (_draggedItem) {
                    this._insertBeforeItem(item)
                }
            },
            onDragStart: (item, itemIndex, selectedItems, event) => {
                _draggedItem = item
            },
            onDragEnd: (item, event) => {
                _draggedItem = null
            },
        };
    }

    _insertBeforeItem(item) {
        const draggedVideos = [_draggedItem]
        const videos = this.state.videos.filter(i => draggedVideos.indexOf(i) === -1)
        let insertIndex = videos.indexOf(item)

        if (insertIndex === -1) {
            insertIndex = 0
        }

        videos.splice(insertIndex, 0, ...draggedVideos)

        this.setState({ videos })
    }

    @autobind
    _onColumnClick(ev, column) {
        const { columns, videos } = this.state
        let newVideos = videos.slice()
        const newColumns = columns.slice()
        const currColumn = newColumns.filter((currCol, idx) => {
            return column.key === currCol.key
        })[0]
        newColumns.forEach((newCol) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending
                currColumn.isSorted = true
            } else {
                newCol.isSorted = false
                newCol.isSortedDescending = true
            }
        })
        newVideos = this._sortItems(newVideos, currColumn.fieldName, currColumn.isSortedDescending)
        this.setState({
            columns: newColumns,
            videos: newVideos
        })
    }

    @autobind
    _sortItems(items, sortBy, descending = false) {
        return items.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return descending ? 1 : -1
            } else if (a[sortBy] > b[sortBy]) {
                return descending ? -1 : 1
            }
            return 0
        })
    }

}
