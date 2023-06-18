import React from 'react';
import Layout from './components/layout';
import Activities from './components/activities';
import Weather from './components/weather';

const App = () => {
  return (
  <Layout>
    <Activities/>
    <Weather/>
  </Layout>
  )
};

export default App;
