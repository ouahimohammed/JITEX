import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout';
import VolsList from './components/VolsList';
import VolsDetails from './components/VolsDetails';
import VolsReservation from './components/VolsReservation';
import Footer from './components/Footer'
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<VolsList />} />
            <Route path="flight/:id" element={<VolsDetails />} />
            <Route path="reservation/:id" element={<VolsReservation />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;

