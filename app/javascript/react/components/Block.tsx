import * as React from 'react'
import { useLeftBlock, useNewBlock } from '../hooks/blocks'

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

  return <div>
    <div className="block row no-gutters">
      <div className="col-lg-3">
        { isEditing
          ? <b><input type="text" onChange={handleChangeTitle} value={block.title} /></b>
          : <b>{block.title}</b>
        }
      </div>

      <div className="col-lg-9">
        { isEditing
          ? <input type="text" onChange={handleChangeBody} value={block.body} />
          : <b>{block.body}</b>
        }
      </div>

      <div className="col-lg-12">
        { isEditing
          ? <button className="btn btn-primary" onClick={toggleIsEditing}>DONE</button>
          : <button className="btn btn-info" onClick={toggleIsEditing}>EDIT</button>
        }
      </div>
    </div>

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
}

export const RightBlock = (props: IRightBlock) => {
  const { block, blocks } = props
  const innerBlocks = blocks.filter(innerBlock => innerBlock.parentId === block.id)

  return <div>
    <div className="block row no-gutters">
      <div className="col-lg-3">
        <b>{block.title}</b>
      </div>

      <div className="col-lg-9">
        {block.body}
      </div>
    </div>

    <div className="blocks">
      {
        innerBlocks.map(innerBlock => {
          return <RightBlock key={innerBlock.id} block={innerBlock} blocks={blocks} />
        })
      }

      <div>
        <div className="block block--phantom">trascina qui per aggiungere una ragione</div>
      </div>
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
