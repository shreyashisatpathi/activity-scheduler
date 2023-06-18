import React, { FC } from 'react'
import data from './data'
import Activity from './activity'

const Activities :FC = () => {
  return (
    <div className="basis-2/3 h-calc(100vh-3.75rem) p-4">
        {
            data.map((activity)=>{
                return <Activity {...activity}/>
            })
        }
    </div>
  )
}

export default Activities