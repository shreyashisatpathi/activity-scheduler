import React, { useState } from 'react';
import Layout from './components/layout';
import Activities from './components/activities';
import Weather from './components/weather';
import type { ActivityType } from './type';
import ActivityModal from './components/modals/activityModal';

const App = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [editableActivity, setEditableActivity] = useState<ActivityType>();
  const getActivities = (formData: ActivityType) => {
    setActivities([...activities, formData as ActivityType]);
  };

  const handleEditActivities = (id: string) => {
    const activity = activities.find((activity) => activity.id === id);
    setEditableActivity(activity);
  };
  console.log('editableActivity in app', editableActivity);

  const handleDeleteActvity = (id: string) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);
  };

  console.log('activities', activities);
  return (
    <Layout>
      <Activities
        activities={activities}
        handleDelete={handleDeleteActvity}
        handleEdit={handleEditActivities}
      />
      <Weather temp={0} rain={false} />
      <ActivityModal
        getActivities={getActivities}
        editableActivity={editableActivity}
      />
    </Layout>
  );
};

export default App;
