import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

import '../css/login/login.css'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    return <Navigate to='/' />
  }
  return (
    <div classNameName='text-center'>
      <Helmet>
        <title>GestionEmployes - Login</title>
        <meta 
          name='description'
          content='login page'
        />
      </Helmet>
      <form className='form-signin' onSubmit={e => onSubmit(e)}>
        <div className="text-center">
          <img
          className="mb-4 rounded rounded-circle"
          src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
          alt=""
          loading='lazy'
          width="70"
          height="70"
        />
        </div>
        
        <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control mb-2"
            name='email'
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name='password'
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
            minLength='4'
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" >
          Sign in
        </button>
        <p className='mt-2 text-muted'>
          Don't have an account ?  <Link to="/signup">Register here</Link>
        </p>
        <p className="mt-2 mb-3 text-muted text-center">@2023 with 💙 by CS</p>
      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)