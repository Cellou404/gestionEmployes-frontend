import React ,{ useState, useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { BsArrowReturnLeft, BsEyeFill, BsTrash } from 'react-icons/bs'
import {BiEditAlt} from 'react-icons/bi'


const ProjectDetail = () => {
  const [project, setProject] = useState('')
  const [projectTasks, setProjectTasks] = useState([])

  const { slug } = useParams()

  const getProject= async  () => {
    const { data } = await axios.get(`/api/projects/${slug}/`)
    setProject(data)
  }

  useEffect(() => {
    getProject()
  }, [])

  const getProjectTasks = async () => {
    const res = await axios.get(`/api/projects/${slug}/project-tasks/`)
    setProjectTasks(res.data)
    console.log(res)
  }

  useEffect(() => {
    getProjectTasks()
  }, [])



  return (
    <div className="container">
      <div
        className="update-form shadow shadow-sm p-3"
        style={{ maxWidth: "800px", margin: "0 auto", marginTop: "50px" }}
      >
        <form>
          <h1 className="h3 mb-3 fw-normal text-center">Project Details</h1>

          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="form-control form-control-md"
              name="title"
              value={project.title}
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="owner">
              Owner
            </label>
            <input
              type="owner"
              className="form-control form-control-md"
              name="owner"
              value={project.owner}
            />
          </div>

          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              className="form-control form-control-md"
              name="description"
              value={project.description}
            />
          </div>

          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="created">
              Date Created
            </label>
            <input
              type="text"
              className="form-control form-control-md"
              name="created"
              value={project.created}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="checkbox"
              name="complete"
              defaultChecked={project.complete}
              value={project.complete}
            />
            <label className="mb-1 m-2" htmlFor="complete">
              complete
            </label>
          </div>
          <Link className="btn btn-secondary btn-md me-2" to="/projects">
            <BsArrowReturnLeft /> Go Back
          </Link>
        </form>
      </div>

      <Fragment >
        <h3 className='text-center mt-5'>Project Tasks</h3>
        <table className="table table-striped mt-3" style={{ maxWidth: "800px", margin: "0 auto"}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task Name</th>
              <th scope="col">complete</th>
              <th scope="col">created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
        
        <tbody>
          {projectTasks ? (
            projectTasks.map((task, id) => (
              <tr key={id}>
                <th scope="row">{task.id}</th>
                <td>{task.task_name}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={task.complete}
                    value={task.complete}
                  />
                </td>
                <td>{task.created.slice(0, 10)}</td>
                <td>
                  <Link>
                    <BsEyeFill />
                  </Link>
                  <Link
                    style={{ color: "green", marginLeft: "6px" }}
                  >
                    <BiEditAlt />
                  </Link>
                  <Link style={{ color: "red", marginLeft: "6px" }}>
                    <BsTrash />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className='text-center text-danger-50'>
              <td>No tasks for this project</td>
            </tr>
          )}
        </tbody>
        </table>
      </Fragment>
    </div>
  );
}

export default ProjectDetail