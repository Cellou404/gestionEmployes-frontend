import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { signup } from '../actions/auth';

import PropTypes from 'prop-types';

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Password do not match', 'danger')
    } else {
      signup({ name, email, password, password2 })
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <div classNameName='text-center'>
      <Helmet>
        <title>GestionEmployes - SignUp</title>
        <meta 
          name='description'
          content='signup page'
        />
      </Helmet>
      <form className='form-signin' onSubmit={e => handleSubmit(e)}>
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
        
        <h1 className="h3 mb-3 fw-normal text-center">Create Your Account</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control mb-2"
            name='name'
            id="floatingInput"
            placeholder="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <label for="floatingInput">Your name</label>
        </div>

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
          <label for="floatingInput">Email address</label>
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
          <label for="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name='password2'
            id="floatingPassword"
            placeholder="Password"
            value={password2}
            onChange={e => onChange(e)}
            minLength='4'
          />
          <label for="floatingPassword">Re-Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary">
          Register
        </button>
        <p className='mt-2 text-muted'>
          Already have an account ?  <Link to="/login">Login here</Link>
        </p>
        <p className="mt-2 mb-3 text-muted text-center">@2023 with 💙 by CS</p>
      </form>
    </div>
  )
}

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(SignUp)