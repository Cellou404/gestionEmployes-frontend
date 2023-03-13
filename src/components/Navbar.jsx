import React, {Fragment} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Alert from './Alert';
import PropTypes from 'prop-types';

import { BiLogOut, BiLogIn } from 'react-icons/bi';

const Navbar = ({ auth: { isAuthenticated, loading }, logout}) => {
  const authLinks = (
    <Link className="navbar-link" onClick={logout}><BiLogOut /> Logout</Link>
  )

  const guestLinks = (
    <Fragment>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link className='nav-link' exact to='/login'><BiLogIn /> Login</Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' exact to='/signup'>Register</Link>
        </li>

      </ul>
    </Fragment>
  )
  return (
    <Fragment>
    <nav className="navbar navbar-expand-lg bg-light rounded" aria-label="Thirteenth navbar example">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <Link className="navbar-brand col-lg-3 me-0" exact to="/">G-Emp</Link>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" exact to="/employees">Employees</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" exact to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" exact to="/projects">Projects</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Pages</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/employees">Employee</Link></li>
                <li><Link className="dropdown-item" to="/tasks">Tasks</Link></li>
                <li><Link className="dropdown-item" to="/projects">Projects</Link></li>
              </ul>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </Fragment>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);