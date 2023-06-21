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

  const handleEditActivity = (id: string) => {
    const selectedActivity = activities.find((activity) => activity.id === id);
    setEditableActivity(selectedActivity);
  };
  const handleDeleteActvity = (id: string) => {
    const remaningActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(remaningActivities);
  };

  const handleUpdateActivity = (updatedActivity: ActivityType) => {
    activities[
      activities.findIndex((activity) => activity.id === updatedActivity.id)
    ] = updatedActivity;
    setActivities(activities);
    setEditableActivity(undefined);
  };
  return (
    <Layout>
      <Activities
        activities={activities}
        handleDelete={handleDeleteActvity}
        handleEdit={handleEditActivity}
      />
      <Weather temp={0} rain={false} />
      <ActivityModal
        getActivities={getActivities}
        editableActivity={editableActivity}
        resetForm={!!editableActivity}
        updateActivity={handleUpdateActivity}
        isEditMode={!!editableActivity}
      />
    </Layout>
  );
};

export default App;
