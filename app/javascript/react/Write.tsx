import * as React from 'react'
import { IBlock, LeftBlock, MainBlock, NewBlock, DroppablePhantomBlock, RightBlock } from './components/Block'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import create from './controllers/create'

const initialBlocks: IBlock[] = [{
  id: 0,
  title: 'Lo smartworking è un diritto',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 1,
  title: 'Questo è un titolo 1',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}]

const Write = (props: {}) => {
  const [blocks, setBlocks] = React.useState(initialBlocks)
  const mainBlock = blocks.find(block => block.id === 0)
  const leftBlocks = blocks.filter(block => block.parentId === null && block.id !== 0)
  const rightBlocks = blocks.filter(block => block.parentId === 0)

  const handlePublish = () => {
    create(blocks).then(response => response.json()).then(({ redirect }) => { window.location.href = redirect })
  }

  return <div>
    <hr/>

    <MainBlock block={mainBlock} onSubmit={handlePublish}/>

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
