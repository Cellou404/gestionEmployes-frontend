import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import {BsEyeFill, BsTrash} from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'

import '../../css/common.css'

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState()

    const { slug } = useParams()

    const fetchData = async () => {
      const response = await axios.get("/api/projects/");
      setProjects(response.data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    // Fetch single project
    const getProject = async () => {
      const response = await axios.get(`/api/projects/${slug}/`);
      setProject(response.data);
    }

    useEffect(() => {
      getProject();
    }, []);

    const handleDelete = async () => {
      await axios.delete(`/api/projects/${slug}/`)
      const newProjects = projects.filter( project => project.slug !== slug )
      setProjects(newProjects)
  
      alert("Empoyee has been deleted")
    }
    
    return (
      <div className="container">
        <Helmet>
          <title>GestionEmplyes - Projects List</title>
          <meta
            name="description"
            content="GestionEmplyes projects Listing Page"
          />
        </Helmet>

        <header className="pb-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="32"
              className="me-2"
              viewBox="0 0 118 94"
              role="img"
            >
              <title>Bootstrap</title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="fs-4">GestionEmployes</span>
          </a>
        </header>

        <div className="p-4 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Projects List</h1>
            <p className="col-md-8 fs-3">
              Using a series of utilities, you can create this jumbotron, just
              like the one in previous versions of Bootstrap. Check out the
              examples below for how you can remix and restyle it to your
              liking.
            </p>
            <Link
              to={`/projects/create`}
              className="btn btn-primary btn-md"
              type="button"
            >
              Add project
            </Link>
          </div>
        </div>
        {/* Project Listing */}
        <Fragment>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Owner</th>
                <th scope="col">complete</th>
                <th scope="col">created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects ? (
                projects.map((project, slug) => (
                  <tr key={slug}>
                    <th scope="row">{project.id}</th>
                    <td>{project.title}</td>
                    <td>{project.owner}</td>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={project.complete}
                        value={project.complete}
                      />
                    </td>
                    <td>{project.created.slice(0, 10)}</td>
                    <td>
                      <Link to={`/projects/${project.slug}`}>
                        <BsEyeFill />
                      </Link>
                      <Link
                        to={`/projects/${project.slug}/update`}
                        style={{ color: "green", marginLeft: "6px" }}
                      >
                        <BiEditAlt />
                      </Link>
                      <Link
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteProject"
                        className="deleteBtn"
                      >
                        <BsTrash />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>Nothing to display!</tr>
              )}
            </tbody>
          </table>
        </Fragment>

        {/* Project Delete Modal */}
        <Fragment>
          <div
            class="modal fade"
            id="deleteProject"
            tabindex="-1"
            aria-labelledby="deleteProjectLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title text-danger fs-5"
                    id="deleteProjectLabel"
                  >
                    Delete Project
                  </h1>
                  <button
                    type="button"
                    class="btn-close text-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>By deleting this Project, you will lose:</p>
                  <ul>
                    <li>Project name</li>
                    <li>Project description</li>
                    <li>Project status (completed or not)</li>
                    <li>Project created date</li>
                  </ul>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDelete(project.slug)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
}

export default ProjectList