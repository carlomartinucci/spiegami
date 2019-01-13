import * as React from 'react'

const HelloWorld = (props: {}) => {
  const [name, setName] = React.useState('cambiami')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value)

  return <input value={name} onChange={handleChange}/>
}

export default HelloWorld
