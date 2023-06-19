import React, { FC } from 'react';

import Activity from './activity';
import AddActivity from './AddActivity';
import { ActivityType } from '../../type';

type Props = {
  activities: ActivityType[];
};

const Activities: FC<Props> = ({ activities }) => {
  console.log(activities);
  if (activities.length === 0) {
    return (
      <div className="max-w-lg shadow-lg p-6">
        <h3>You Haven't scheduled any activity yet</h3>
        <p>Please click the button</p>
        <AddActivity />
      </div>
    );
  }
  return (
    <div className="basis-2/3 h-calc(100vh-3.75rem) p-4 max-w-lg">
      <AddActivity />
      {activities.map((activity, index) => {
        return <Activity key={index} {...activity} />;
      })}
    </div>
  );
};

export default Activities;
