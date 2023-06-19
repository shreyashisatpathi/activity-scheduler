import React, { useState } from 'react';
import Layout from './components/layout';
import Activities from './components/activities';
import Weather from './components/weather';
import type { ActivityType } from './type';
import ActivityModal from './components/modals/activityModal';

const App = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const getActivities =(formData: ActivityType ) => {
    setActivities([...activities, formData as ActivityType]);
  }

  return (
  <Layout>
    <Activities activities={activities}/>
    <Weather/>
    <ActivityModal getActivities={getActivities}/>
  </Layout>
  )
};

export default App;
