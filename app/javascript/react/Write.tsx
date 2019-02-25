import * as React from 'react'
import { DroppablePhantomBlock, IBlock, LeftBlock, MainBlock, NewBlock, RightBlock } from './components/Block'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import create from './controllers/create'

const Write = (props: {title?: string}) => {
  const [blocks, setBlocks] = React.useState<IBlock[]>([{
    id: 0,
    title: props.title || '',
    body: '',
    parentId: null
  }, {
    id: 1,
    title: 'Esempio di titolo',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet quo quibusdam perspiciatis eaque a possimus accusamus mollitia recusandae esse veritatis aliquam, quis vitae saepe ipsa quisquam distinctio, corporis ducimus quas.',
    parentId: null
  }])
  const mainBlock = blocks.find(block => block.id === 0)
  const leftBlocks = blocks.filter(block => block.parentId === null && block.id !== 0)
  const rightBlocks = blocks.filter(block => block.parentId === 0)

  const handlePublish = () => {
    create(blocks).then(response => response.json()).then(({ redirect }) => { window.location.href = redirect })
  }

  return <div>
    <hr/>

    <MainBlock block={mainBlock} blocks={blocks} setBlocks={setBlocks} onSubmit={handlePublish}/>

    <hr/>

    <div className="d-flex flex-row">
      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-left">
        <h4 className="mt-0 mb-4">Scrivi i tuoi blocchi</h4>

        {
          leftBlocks.map(block => (
            <LeftBlock key={block.id} block={block} blocks={blocks} setBlocks={setBlocks} />
          ))
        }

        <DroppablePhantomBlock parentId={null}/>

        <hr className="my-4" />

        <NewBlock blocks={blocks} setBlocks={setBlocks} />
      </div>

      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-right">
        <h4 className="mt-0 mb-4">Organizza i tuoi blocchi</h4>

        {
          rightBlocks.map(block => (
            <RightBlock key={block.id} block={block} blocks={blocks} setBlocks={setBlocks} />
          ))
        }

        <DroppablePhantomBlock parentId={0} />
      </div>
    </div>

    <hr/>
  </div>
}

export default DragDropContext(HTML5Backend)(Write)
