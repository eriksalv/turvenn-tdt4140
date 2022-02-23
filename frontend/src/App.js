import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTrip from './pages/CreateTrip';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import ViewTrip from './pages/ViewTrip';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/trip/:id" element={<ViewTrip />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
