import * as React from 'react'

import HTML5Backend from 'react-dnd-html5-backend'

import { DragDropContext } from 'react-dnd'

import Block from './Block'

const update = require('immutability-helper')

export interface IState {
  blocks: Array<{
    id: number
    text: string
  }>
}

class BlocksContainer extends React.Component<{}, IState> {
  public state = {
    blocks: [
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ],
  }

  public render() {
    const { blocks } = this.state

    return (
      <div className="block-container">
        {blocks.map((block, i) => (
          <Block
            key={block.id}
            index={i}
            id={block.id}
            text={block.text}
            moveBlock={this.moveBlock}
          />
        ))}
      </div>
    )
  }

  private moveBlock = (dragIndex: number, hoverIndex: number) => {
    const { blocks } = this.state
    const dragBlock = blocks[dragIndex]

    this.setState(
      update(this.state, {
        blocks: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragBlock]],
        },
      }),
    )
  }
}

export default DragDropContext(HTML5Backend)(BlocksContainer)
