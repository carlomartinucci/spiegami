import * as React from 'react'

import produce from 'immer'

import { IBlock } from '../components/Block'

import uuid from '../utils/uuid'

export const useEditBlock = ({ block, blocks, setBlocks }: IUseLeftBlock) => {
  const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].title = event.currentTarget.value
    })
  )

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].body = event.currentTarget.value
    })
  )

  return { handleChangeTitle, handleChangeBody }
}

interface IUseNewBlock {
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

const emptyFactory = () => {
  return { id: uuid(), title: '', body: '', parentId: null }
}

export const useNewBlock = ({ blocks, setBlocks }: IUseNewBlock) => {
  const [block, setBlock] = React.useState(emptyFactory())

  const create = () => {
    setBlocks(blocks.concat(block))
    setBlock(emptyFactory())
  }
  const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBlock({...block, title: event.currentTarget.value})
  }
  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBlock({...block, body: event.currentTarget.value})
  }

  return { block, handleChangeTitle, handleChangeBody, create }
}

interface IUseLeftBlock {
  block: IBlock
  blocks: IBlock[]
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
}

export const useLeftBlock = ({ block, blocks, setBlocks }: IUseLeftBlock) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const toggleIsEditing = () => setIsEditing(!isEditing)

  const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].title = event.currentTarget.value
    })
  )

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => setBlocks(
    produce(blocks, draftBlocks => {
      const index = draftBlocks.findIndex(draftBlock => draftBlock.id === block.id)
      draftBlocks[index].body = event.currentTarget.value
    })
  )

  return { isEditing, toggleIsEditing, handleChangeTitle, handleChangeBody }
}
