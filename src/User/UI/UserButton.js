import React from 'react';

const UserButton = ({text, onClick,isDisabled}) => {
  if(isDisabled){
    return(
      <div>
        {text}
      </div>)
  }else{
    return(
      <div onClick={(e)=>{onClick()}}>
        {text}
      </div>)
  }
}

export default UserButton
