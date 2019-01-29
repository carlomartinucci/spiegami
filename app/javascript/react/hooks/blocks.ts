import * as React from 'react'

import produce from 'immer'

import { IBlock } from '../components/Block'

interface IUseNewBlock {
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const useNewBlock = ({ blocks, setBlocks }: IUseNewBlock) => {
  const emptyFactory = () => {
    return { id: blocks[blocks.length - 1].id + 1, title: '', body: '', parentId: null }
  }

  const [block, setBlock] = React.useState(emptyFactory())
  const [isVisible, setIsVisible] = React.useState(false)
  const create = () => {
    setBlocks(blocks.concat(block))
    setBlock(emptyFactory())
    setIsVisible(false)
  }
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlock({...block, title: event.currentTarget.value})
  }
  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlock({...block, body: event.currentTarget.value})
  }
  const setVisible = () => { setIsVisible(true) }

  return { isVisible, setVisible, block, handleChangeTitle, handleChangeBody, create }
}

interface IUseLeftBlock {
  block: IBlock
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const useLeftBlock = ({ block, blocks, setBlocks }: IUseLeftBlock) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const toggleIsEditing = () => setIsEditing(!isEditing)

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].title = event.currentTarget.value
    })
  )

  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].body = event.currentTarget.value
    })
  )

  return { isEditing, toggleIsEditing, handleChangeTitle, handleChangeBody }
}
