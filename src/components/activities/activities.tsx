import React, { FC } from 'react'
import {activities} from '../../mock/data'
import Activity from './activity'
import AddActivity from './AddActivity'

const Activities :FC = () => {
  return (
    <div className="basis-2/3 h-calc(100vh-3.75rem) p-4">
        <AddActivity/>
        {
            activities.map((activity)=>{
                return <Activity {...activity}/>
            })
        }
    </div>
  )
}

export default Activities