import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from './component/common/Navbar';
import LoginForm from './component/common/Login';
import { Home } from './component/common/Home';

import RegisterForm from './component/common/RegisterForm';
import VillaListPage from './component/admin/VillaListPage';
import CreateVillaPage from './component/admin/CreateVillaPage';
import EditVillaPage from './component/admin/EditVillaPage';
import { Home1 } from './component/admin/Home1';
import VillaDetails from './component/user/VillaDetails';
import CreateAmenity from './component/admin/CreateAminity';
import AmenityList from './component/admin/AmenityList';
import { Home2 } from './component/user/home2';

const stripePromise = loadStripe('your_stripe_publishable_key');

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
       
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/VillaDetails" element={<VillaDetails />} />
          <Route path="/create-amenity" element={<CreateAmenity />} />
          <Route path="/amenity-list" element={<AmenityList />} />

          <Route path="/VillaListPage" element={<VillaListPage />} />
          <Route path="/create-villa" element={<CreateVillaPage />} />
          <Route path="/edit-villa/:id" element={<EditVillaPage />} />
        </Routes>
      </Elements>
    </Router>
  );
}

export default App;
