import * as React from 'react'
import { IBlock, LeftBlock, MainBlock, NewBlock, RightBlock } from './components/Block'

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

  return <div>
    <hr/>

    <MainBlock block={mainBlock} onSubmit={undefined}/>

    <hr/>

    <div className="d-flex flex-row">
      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-left">
        <h4 className="mt-0 mb-4">Scrivi i tuoi blocchi</h4>

        {
          blocks.filter(block => block.parentId === null)
            .map(block => (
              <LeftBlock key={block.id} block={block} blocks={blocks} setBlocks={setBlocks} />
            ))
        }

        <hr className="my-4" />

        <NewBlock blocks={blocks} setBlocks={setBlocks} />
      </div>

      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-right">
        <h4 className="mt-0 mb-4">Organizza i tuoi blocchi</h4>

        {
          blocks.filter(block => block.parentId === 0)
            .map(block => (
              <RightBlock key={block.id} block={block} blocks={blocks} />
            ))
        }
      </div>
    </div>

    <hr/>
  </div>
}

export default Write
