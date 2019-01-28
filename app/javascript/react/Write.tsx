import * as React from 'react'
import Block from './components/Block'
// import useBlocks from './hooks/useBlocks'

const initialBlocks = [{
  id: 1,
  title: 'Questo è un titolo 1',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 2,
  title: 'Questo è un titolo 2',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 3,
  title: 'Questo è un titolo 3',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 4,
  title: 'Questo è un titolo 4',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 5,
  title: 'Questo è un titolo 5',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 6,
  title: 'Questo è un titolo 6',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 7,
  title: 'Questo è un titolo 7',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 8,
  title: 'Questo è un titolo 8',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 9,
  title: 'Questo è un titolo 9',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellendus eum dolores molestias earum quisquam, provident alias! Sapiente, ullam, culpa et iure libero, autem maiores in voluptate non unde aspernatur!',
  parentId: null
}, {
  id: 10,
  title: 'Questo è un titolo 10',
  body: 'id: 10, parentId: 3',
  parentId: 3
}]

const Write = (props: {}) => {
  const [blocks, setBlocks] = React.useState(initialBlocks)
  const addBlock = (block: any) => { setBlocks(blocks.concat(block)) }

  return <div>
    <hr/>

    <div className="px-5 my-4">
      <div className="row">
        <div className="col-lg-8">
          <h4 className="mt-0 mb-4">Stai argomentando sul tema</h4>
          <h2>Lo smartworking è un diritto</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque harum error saepe tenetur ea impedit commodi, corporis mollitia quidem, odit rem tempore maiores quia, aspernatur et incidunt quasi iusto eveniet.</p>
        </div>

        <div className="col-lg-4 text-right">
          <button className="btn btn-lg btn-primary disabled" disabled>PUBBLICA</button>
        </div>
      </div>
    </div>

    <hr/>

    <div className="d-flex flex-row">
      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-left">
        <h4 className="mt-0 mb-4">Scrivi i tuoi blocchi</h4>

        {blocks.filter(block => block.parentId == null).map(block => <Block key={block.id} block={block} blocks={blocks} />)}
        <hr className="my-4" />
        <button className="btn btn-outline-primary">
          + Aggiungi blocco
        </button>
      </div>

      <div style={{flex: '0 0 50%'}} className="px-5 py-4 write-right">
        <h4 className="mt-0 mb-4">Organizza i tuoi blocchi</h4>

        {blocks.filter(block => block.parentId === 0).map(block => <Block key={block.id} block={block} blocks={blocks} isNested />)}
      </div>
    </div>

    <hr/>
  </div>
}

export default Write
