import React from 'react'
import Leave from './Leave'
const Leaves = ({leaves}) => {
  return (
    <>{ leaves.map((leave) => (<Leave key={leave.id} leave={leave} />)
   
    )}</>  
    )
    // <>{leaves.map((leave) => (<h3>{leave.id}</h3>))}</>
  
  }
export default Leaves