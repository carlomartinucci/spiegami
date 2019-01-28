import * as React from 'react'

const Block = (props: {block: any, blocks: any, isNested?: boolean}) => {
  const { block, blocks, isNested } = props

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
      {blocks.filter((innerBlock: any) => innerBlock.parentId === block.id).map((innerBlock: any) => <Block key={innerBlock.id} block={innerBlock} blocks={blocks} isNested={isNested} />)}

      { isNested && <div>
        <div className="block block--phantom">trascina qui per aggiungere una ragione</div>
      </div> }
    </div>
  </div>
}

export default Block
