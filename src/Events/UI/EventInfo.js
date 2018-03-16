import React from 'react';

const Items = (eventInfo) => {
    return Object.keys(eventInfo).map((element,index) => (
      <div key = {index}>
        <h3>{element.charAt(0).toUpperCase()+element.substring(1)}</h3>
        <h4>{eventInfo[element]}</h4>
      </div>)
    )
}

const EventInfo = ({eventInfo}) =>{
  console.log(eventInfo);
  return (
    <div>
      {Items(eventInfo)}
    </div>
  )

}

export default EventInfo
