import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTrip from './pages/CreateTrip';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import ViewTrip from './pages/ViewTrip';
import User from './pages/User';
import 'react-toastify/dist/ReactToastify.css';
import EditTrip from './pages/EditTrip';

function App() {
  moment.locale('nb');

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-trip" element={<PrivateRoute />}>
            <Route path="/create-trip" element={<CreateTrip />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/trips/:id" element={<ViewTrip />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/edit-trip" element={<EditTrip />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
