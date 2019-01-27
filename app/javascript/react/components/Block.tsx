import * as React from 'react'

const Block = (props: any) => {
  return <div className="block">
    <div>
      {props.text}
    </div>

    <div style={{marginLeft: '5px'}}>
      {props.blocks.map((block: any) => <Block key={block.id} {...block} />)}
    </div>
  </div>
}

export default Block
