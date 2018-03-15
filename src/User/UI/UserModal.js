
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
const UserModal = ({_handleChange,_inputs}) => {
  return(
    <div>
      <p>{'Sign-Up Form'}</p>
      {ModalInputs(_handleChange,_inputs)}
    </div>)
}

export default UserModal
