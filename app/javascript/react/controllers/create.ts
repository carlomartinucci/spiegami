import * as fetch from 'isomorphic-fetch'

import { IBlock } from '../components/Block'

interface IBlocksTree {
  title: string
  body: string
  blocks: IBlocksTree[]
}

const buildBlocksTree = (blocks: IBlock[], block: IBlock): IBlocksTree[] => {
  return blocks.filter(b => b.parentId === block.id).map(b => ({
    title: b.title,
    body: b.body,
    blocks: buildBlocksTree(blocks, b)
  }))
}

const create = (blocks: IBlock[]) => {
  const method = 'POST'
  const headers = { 'Content-Type': 'application/json' }
  const block = blocks.find(b => b.id === 0)

  if (!block) throw new Error('non ho trovato il blocco con id === 0')

  const blockTree = {
    title: block.title,
    body: block.body,
    blocks: buildBlocksTree(blocks, block)
  }

  const body = JSON.stringify({ block_tree: blockTree })

  const options = {
    method, headers, body
  }

  console.log(options)

  return fetch('/blocks/create_block_tree', options)
}

export default create
