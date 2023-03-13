import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './hocs/Layout'
import Home from './containers/Home';
import { Provider } from 'react-redux';
import store from './store';

import EmployeeListing from './containers/employees/EmployeeListing';
import EmployeeDetail from './containers/employees/EmployeeDetail';
import EmployeeUpdate from './containers/employees/EmployeeUpdate';
import EmployeeCreate from './containers/employees/EmployeeCreate';

import SignUp from './containers/SignUp';
import Login from './containers/Login';
import NotFound from './components/NotFound';


import ProjectListing from './containers/projects/ProjectListing';
import ProjectDetail from './containers/projects/ProjectDetail';
import ProjectUpdate from './containers/projects/ProjectUpdate';
import ProjectCreate from './containers/projects/ProjectCreate';

import TaskList from './containers/tasks/TaskList';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />

            {/* employees route */}
            <Route path="/employees" element={<EmployeeListing />} />
            <Route path="/employees/:slug" element={<EmployeeDetail />} />
            <Route path="/employees/:slug/update" element={<EmployeeUpdate />} />
            <Route path="/employees/create" element={<EmployeeCreate />} />

            {/* tasks route */}
            <Route path="/tasks" element={<TaskList />} />

            {/* projects route */}
            <Route path="/projects" element={<ProjectListing />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            <Route path="/projects/:slug/update" element={<ProjectUpdate />} />

            {/* auth route */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* notfound route */}
            <Route path='*' element={<NotFound />} />
        </Routes>
      </Fragment>
    </Provider>
  );
 
}

export default App;
