
import React from 'react'

const ModalInputs = (handleChange,_args) => {
  return Object.keys(_args).map((element,index) => (
    <input
      key={index}
      id={element}
      placeholder={element}
      type='text'
      value={_args[element]}
      onChange={(e) => handleChange({[element]:e.target.value})}
    />
  ))
}

//@arg takes handleChange function
//@arg takes object of {input names : input state value}
const UserModal = (handleChange,_args) => {
  return(
    <div>
      <p>{'Sign-Up Form'}</p>
      {ModalInputs(handleChange,_args)}
    </div>)
}

export default UserModal
