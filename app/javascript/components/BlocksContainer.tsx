import * as React from 'react'

import HTML5Backend from 'react-dnd-html5-backend'

import { DragDropContext } from 'react-dnd'

import Block from './Block'

const update = require('immutability-helper')

interface IBlock {
  id: number,
  text: string,
  blocks?: IBlock[]
}

export interface IState {
  writtenBlocks: IBlock[]
}

class BlocksContainer extends React.Component<{}, IState> {
  public state = {
    writtenBlocks: [
      {
        id: 1,
        text: 'Write a cool JS library',
        blocks: [
          {
            id: 8,
            text: 'MAGA'
          }
        ]
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
    const { writtenBlocks } = this.state

    return (
      <div className="block-container">
        {writtenBlocks.map((block, i) => (
          <Block
            key={block.id}
            index={i}
            moveBlock={this.moveBlock}
            {...block}
          />
        ))}
      </div>
    )
  }

  private moveBlock = (dragIndex: number, hoverIndex: number) => {
    const { writtenBlocks } = this.state
    const dragBlock = writtenBlocks[dragIndex]

    this.setState(
      update(this.state, {
        writtenBlocks: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragBlock]],
        },
      }),
    )
  }
}

export default DragDropContext(HTML5Backend)(BlocksContainer)
