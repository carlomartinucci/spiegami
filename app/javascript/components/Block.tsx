import * as React from 'react'
import { findDOMNode } from 'react-dom'

import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'

const ItemTypes = {
  BLOCK: 'block'
}

const blockSource = {
  beginDrag(props: IBlockProps) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const blockTarget = {
  hover(props: IBlockProps, monitor: DropTargetMonitor, component: Block | null) {
    if (!component) return null

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    ) as Element).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

    // Time to actually perform the action
    props.moveBlock(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex

    return
  },
}

export interface IBlockProps {
  id: any
  text: string
  index: number
  moveBlock: (dragIndex: number, hoverIndex: number) => void
}

interface IBlockSourceCollectedProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

interface IBlockTargetCollectedProps {
  connectDropTarget: ConnectDropTarget
}

class Block extends React.Component<
  IBlockProps & IBlockSourceCollectedProps & IBlockTargetCollectedProps
> {
  public render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(<div className="block" style={{ opacity }}>{text}</div>),
    )
  }
}

export default DropTarget<IBlockProps, IBlockTargetCollectedProps>(
  ItemTypes.BLOCK,
  blockTarget,
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource<IBlockProps, IBlockSourceCollectedProps>(
    ItemTypes.BLOCK,
    blockSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(Block),
)
