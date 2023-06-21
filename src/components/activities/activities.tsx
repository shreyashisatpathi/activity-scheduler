import React, { FC } from 'react';

import Activity from './activity';
import AddActivity from './AddActivity';
import { ActivityType } from '../../type';
//import { activities as mockActivity } from '../../mock/data';
type Props = {
  activities: ActivityType[];
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
};

const Activities: FC<Props> = ({ activities, handleDelete, handleEdit }) => {
   
  if (activities.length === 0) {
    return (
      <div className="basis-1/2 shadow-lg p-6">
        <h3>You Haven't scheduled any activity yet</h3>
        <p className="pb-8">Please click the button</p>
        <AddActivity />
      </div>
    );
  }
  return (
    <div className="basis-2/3 h-calc(100vh-3.75rem) p-4 max-w-lg">
      <AddActivity />
      {activities.map((activity, index) => {
        return <Activity key={index} {...activity} handleDelete={handleDelete} handleEdit={handleEdit}/>;
      })}
    </div>
  );
};

export default Activities;
