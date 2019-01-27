import * as React from 'react'
import Block from './components/Block'
// import useBlocks from './hooks/useBlocks'

const initialLeftBlocks = [{
  id: 1,
  text: 'Ciccio',
  blocks: []
},
{
  id: 2,
  text: 'Pasticcio',
  blocks: []
},
{
  id: 3,
  text: 'Certamente',
  blocks: []
},
{
  id: 4,
  text: 'Ma anche no',
  blocks: []
}]

const initialRightBlocks = [{
  id: 5,
  text: 'Accipicchia',
  blocks: [
    {
      id: 6,
      text: 'Cavolini',
      blocks: []
    },
    {
      id: 8,
      text: 'Abruzzese',
      blocks: []
    }
  ]
},
{
  id: 7,
  text: 'Bruxxelles',
  blocks: []
},
]

const Write = (props: {}) => {
  const [leftBlocks, setLeftBlocks] = React.useState(initialLeftBlocks)
  const [rightBlocks, setRightBlocks] = React.useState(initialRightBlocks)

  return <div className="d-flex flex-row" style={{width: '100%'}}>
    <div style={{width: '50%'}}>
      {leftBlocks.map(block => <Block key={block.id} {...block} />)}
    </div>

    <div style={{width: '50%'}}>
      {rightBlocks.map(block => <Block key={block.id} {...block} />)}
    </div>
  </div>
}

export default Write
