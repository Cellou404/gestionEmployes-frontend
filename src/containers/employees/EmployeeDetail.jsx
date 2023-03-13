import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BsArrowReturnLeft } from 'react-icons/bs'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState('')

  const { slug } = useParams()

  const getEmpoyee = async  () => {
    const { data } = await axios.get(`/api/employees/${slug}`)
    setEmployee(data)
  }

  useEffect(() => {
    getEmpoyee()
  })


  return (
    <Fragment>
      <Helmet>
        <title>GestionEmplyes - Employee Details</title>
        <meta name="description" content="GestionEmplyes tasks Listing Page" />
      </Helmet>
      <div className="container">
        <div
          className="row"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            marginTop: "60px",
            border: "2px solid lightblue",
            borderRadius: "10px",
          }}
        >
          <div className="col-md-4 pt-3">
            <img
              src={employee.avatar}
              alt="avatar"
              width="280"
              className="rounded"
            />
          </div>
          <div className="col-md-8 p-md-4">
            <h3 className="mb-2">Employee Info</h3>
            <div className="row">
              <div className="col-md-4">
                <p>
                  <strong>Name:</strong>
                </p>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>
                  <strong>Designation:</strong>
                </p>
                <p>
                  <strong>Phone:</strong>
                </p>
                <p>
                  <strong>Salary:</strong>
                </p>
                <p>
                  <strong>Address:</strong>
                </p>
              </div>
              <div className="col">
                <p>{employee.name} </p>
                <p>{employee.email} </p>
                <p>{employee.designation} </p>
                <p>{employee.phone} </p>
                <p>{employee.salary} GNF </p>
                <p>{employee.address} </p>
              </div>
            </div>
            {employee.bio ? (
              <Fragment>
                <hr />
                <div className="description">
                  <p>{employee.bio}</p>
                </div>
              </Fragment>
            ) : (
              ""
            )}

            <div className="actions">
              <Link className='btn btn-light btn-md me-2' to="/employees"> <BsArrowReturnLeft /> Go Back </Link>
              <Link className="btn btn-outline-primary btn-md me-2" to={`/employees/${employee.slug}/update`}>Update</Link>
              <Link className="btn btn-outline-danger btn-md" >Delete</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EmployeeDetail