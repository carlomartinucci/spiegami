import * as React from 'react'
import { useLeftBlock, useNewBlock } from '../hooks/blocks'

import produce from 'immer'

import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'

import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd'

export interface IBlock {
  id: number
  title: string
  body: string
  parentId: number | null
}

interface ILeftBlock {
  block: IBlock
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const LeftBlock = (props: ILeftBlock) => {
  const { block, blocks, setBlocks } = props
  const innerBlocks = blocks.filter(innerBlock => innerBlock.parentId === block.id)

  const { isEditing, toggleIsEditing, handleChangeTitle, handleChangeBody } = useLeftBlock(props)

  const setParentId = (parentId: number | null) => {
    setBlocks(
      produce(blocks, draftBlocks => {
        const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
        draftBlocks[index].parentId = parentId
      })
    )
  }

  return <div>
    { isEditing
      ? <EditBlock
        block={block}
        handleChangeTitle={handleChangeTitle}
        handleChangeBody={handleChangeBody}
        toggleIsEditing={toggleIsEditing}
      />
      : <DraggableBlock block={block} setParentId={setParentId}>
        <div className="col-lg-12">
          <button className="btn btn-info" onClick={toggleIsEditing}>EDIT</button>
        </div>
      </DraggableBlock>
    }

    <div className="blocks">
      {
        innerBlocks.map(innerBlock => {
          return <LeftBlock key={innerBlock.id} block={innerBlock} blocks={blocks} setBlocks={setBlocks} />
        })
      }
    </div>
  </div>
}

interface IRightBlock {
  block: IBlock
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const RightBlock = (props: IRightBlock) => {
  const { block, blocks, setBlocks } = props
  const innerBlocks = blocks.filter(innerBlock => innerBlock.parentId === block.id)

  const setParentId = (parentId: number | null) => {
    setBlocks(
      produce(blocks, draftBlocks => {
        const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
        draftBlocks[index].parentId = parentId
      })
    )
  }

  return <div>
    <DraggableBlock block={block} setParentId={setParentId} />

    <div className="blocks">
      {
        innerBlocks.map(innerBlock => {
          return <RightBlock key={innerBlock.id} block={innerBlock} blocks={blocks} setBlocks={setBlocks} />
        })
      }

      <DroppablePhantomBlock parentId={block.id} />
    </div>
  </div>
}

interface INewBlock {
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const NewBlock = (props: INewBlock) => {
  const { isVisible, setVisible, block, handleChangeTitle, handleChangeBody, create } = useNewBlock(props)

  if (isVisible)
    return (
      <div>
        <div className="block row no-gutters">
          <div className="col-lg-3">
            <b><input type="text" onChange={handleChangeTitle} value={block.title} /></b>
          </div>

          <div className="col-lg-9">
            <input type="text" onChange={handleChangeBody} value={block.body} />
          </div>
        </div>
        <button onClick={create}>SAVE</button>
      </div>
    )
  else
    return (
      <button className="btn btn-outline-primary" onClick={setVisible}>
        + Aggiungi blocco
      </button>
    )
}

export const MainBlock = (props: any) => {
  const { block, onSubmit } = props
  return (
    <div className="px-5 my-4">
      <div className="row">
        <div className="col-lg-8">
          <h4 className="mt-0 mb-4">Stai argomentando sul tema</h4>
          <h2>{block.title}</h2>

          <p>{block.body}</p>
        </div>

        <div className="col-lg-4 text-right">
          <button
            className={`btn btn-lg btn-primary ${onSubmit ? '' : 'disabled'}`}
            onClick={onSubmit}
            disabled={!onSubmit}
          >
            PUBBLICA
          </button>
        </div>
      </div>
    </div>
  )
}

const Block = (props: IBlockProps & IBlockSourceCollectedProps) => {
  const { block, children, connectDragSource, isDragging } = props
  const opacity = isDragging ? 0 : 1

  return connectDragSource(
    <div className="block row no-gutters" style={{ opacity }}>
      <div className="col-lg-3">
        <b>{block.title}</b>
      </div>

      <div className="col-lg-9">
        {block.body}
      </div>

      {children}
    </div>
  )
}

const ItemTypes = {
  BLOCK: 'block'
}

interface IBlockProps {
  block: IBlock
  children?: React.ReactNode
}

const blockSource = {
  beginDrag(props: IBlockProps & {setParentId: any}) {
    return {
      id: props.block.id,
      parentId: props.block.parentId,
      setParentId: props.setParentId
    }
  },
}

interface IBlockSourceCollectedProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

const DraggableBlock = DragSource<IBlockProps & {setParentId: any}, IBlockSourceCollectedProps>(
  ItemTypes.BLOCK,
  blockSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Block)

const EditBlock = (props: any) => {
  const { block, handleChangeTitle, handleChangeBody, toggleIsEditing } = props

  return <div className="block row no-gutters">
    <div className="col-lg-3">
      <b><input type="text" onChange={handleChangeTitle} value={block.title} /></b>
    </div>

    <div className="col-lg-9">
      <input type="text" onChange={handleChangeBody} value={block.body} />
    </div>

    <div className="col-lg-12">
      <button className="btn btn-primary" onClick={toggleIsEditing}>DONE</button>
    </div>
  </div>
}

const PhantomBlock = (props: IPhantomBlockProps & IPhantomBlockTargetCollectedProps) => {
  const { connectDropTarget } = props
  return (connectDropTarget(
    <div>
      <div className="block block--phantom">trascina qui per aggiungere una ragione</div>
    </div>
  ))
}

interface IPhantomBlockProps {
  parentId: number | null
}

interface IPhantomBlockTargetCollectedProps {
  connectDropTarget: ConnectDropTarget
}

const blockTarget = {
  drop(props: IPhantomBlockProps, monitor: DropTargetMonitor, component: any) {
    const { parentId } = props
    const { setParentId } = monitor.getItem()

    setParentId(parentId)
    return
  },

  canDrop(props: IPhantomBlockProps, monitor: DropTargetMonitor) {
    return props.parentId !== monitor.getItem().id && props.parentId !== monitor.getItem().parentId
  }
}

export const DroppablePhantomBlock = DropTarget<IPhantomBlockProps, IPhantomBlockTargetCollectedProps>(
  ItemTypes.BLOCK,
  blockTarget,
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(PhantomBlock)
