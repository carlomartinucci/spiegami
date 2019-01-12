import React, { useState } from "react"
import PropTypes from "prop-types"

const HelloWorld = (props) => {
  const [name, setName] = useState('cambiami')

  return <input value={name} onChange={(event) => setName(event.currentTarget.value)}/>;
}

export default HelloWorld
