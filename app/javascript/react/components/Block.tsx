import * as React from 'react'
import { useEditBlock, useNewBlock } from '../hooks/blocks'

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

  const { handleChangeTitle, handleChangeBody } = useEditBlock(props)

  const setParentId = (parentId: number | null) => {
    if (!canSetParentId(blocks, block, parentId)) return
    setBlocks(
      produce(blocks, draftBlocks => {
        const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
        draftBlocks[index].parentId = parentId
      })
    )
  }

  return <div>
    <DraggableEditBlock
      setParentId={setParentId}
      block={block}
      handleChangeTitle={handleChangeTitle}
      handleChangeBody={handleChangeBody}
    />

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

const canSetParentId = (blocks: IBlock[], block: IBlock, parentId: number | null): boolean => {
  if (block.id === parentId) return false
  if (parentId === null) return true
  if (parentId === 0) return true

  const targetBlock = blocks.find(b => b.id === parentId)

  if (!targetBlock) return false
  return canSetParentId(blocks, block, targetBlock.parentId)
}

export const RightBlock = (props: IRightBlock) => {
  const { block, blocks, setBlocks } = props
  const innerBlocks = blocks.filter(innerBlock => innerBlock.parentId === block.id)

  const setParentId = (parentId: number | null) => {
    if (!canSetParentId(blocks, block, parentId)) return

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
  const { block, handleChangeTitle, handleChangeBody, create } = useNewBlock(props)

  return (<div>
    <div className="block row no-gutters">
      <div className="col-lg-3">
        <textarea placeholder="clicca per scrivere il titolo" onChange={handleChangeTitle} value={block.title} rows={4} style={{border: 'none', width: '100%', fontWeight: 'bold'}}/>
      </div>

      <div className="col-lg-9">
        <textarea placeholder="clicca per scrivere il corpo" onChange={handleChangeBody} value={block.body} rows={4} style={{border: 'none', width: '100%'}} />
      </div>

      <div className="col-lg-12 text-right">
        <button className="btn btn-info" onClick={create} disabled={!block.title || !block.body}>Aggiungi</button>
      </div>
    </div>
  </div>)
}

export const MainBlock = (props: any) => {
  const { block, blocks, setBlocks, onSubmit } = props
  const { handleChangeTitle, handleChangeBody } = useEditBlock({ block, blocks, setBlocks })

  return (
    <div className="px-5 my-4">
      <div className="row">
        <div className="col-lg-8">
          <h4 className="mt-0 mb-4">Stai argomentando sul tema</h4>
          <input type="text" onChange={handleChangeTitle} value={block.title} style={{border: 'none', width: '100%', fontSize: '2rem'}}/>

          <textarea placeholder="Clicca per inserire la descrizone del tuo tema" onChange={handleChangeBody} value={block.body} rows={3} style={{border: 'none', width: '100%'}} />
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

const makeDraggable = (Component: React.ComponentType<IBlockProps & {setParentId: any} & IBlockSourceCollectedProps & any>) => {
  return DragSource<IBlockProps & {setParentId: any} & any, IBlockSourceCollectedProps>(
    ItemTypes.BLOCK,
    blockSource,
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(Component)
}

const DraggableBlock = makeDraggable(Block)

const EditBlock = (props: any) => {
  const { block, handleChangeTitle, handleChangeBody } = props
  const { connectDragSource, isDragging } = props
  const opacity = isDragging ? 0 : 1

  return connectDragSource(<div className="block row no-gutters">
    <div className="col-lg-3" style={{ opacity }}>
      <textarea onChange={handleChangeTitle} value={block.title} rows={4} style={{border: 'none', width: '100%', fontWeight: 'bold'}}/>
    </div>

    <div className="col-lg-9">
      <textarea onChange={handleChangeBody} value={block.body} rows={4} style={{border: 'none', width: '100%'}} />
    </div>
  </div>)
}
const DraggableEditBlock = makeDraggable(EditBlock)

const PhantomBlock = (props: IPhantomBlockProps & IPhantomBlockTargetCollectedProps) => {
  const { connectDropTarget } = props
  let placeholder = 'trascina qui un blocco per modificarlo'
  if (props.parentId !== null)
    placeholder = 'trascina qui un blocco per aggiungerlo come ragione'
  return (connectDropTarget(
    <div>
      <div className="block block--phantom">{placeholder}</div>
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

  // canDrop(props: IPhantomBlockProps, monitor: DropTargetMonitor) {
  //   return props.parentId !== monitor.getItem().id && props.parentId !== monitor.getItem().parentId
  // }
}

export const DroppablePhantomBlock = DropTarget<IPhantomBlockProps, IPhantomBlockTargetCollectedProps>(
  ItemTypes.BLOCK,
  blockTarget,
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(PhantomBlock)
