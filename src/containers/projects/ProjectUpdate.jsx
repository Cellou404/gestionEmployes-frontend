import React ,{ useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { BsArrowReturnLeft } from 'react-icons/bs'


const ProjectUpdate = () => {
  const [project, setProject] = useState('')

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [complete, setComplete] = useState(false);


  const { navigate } = useNavigate();

  const { slug } = useParams()

  const getProject= async  () => {
    const { data } = await axios.get(`/api/projects/${slug}/`)
    setProject(data)

    setTitle(data.title)
    setDescription(data.description)
    setComplete(data.complete)
  }

  useEffect(() => {
    getProject()
  }, [])

  const updateProject = async () => {
    let formField = new FormData()
    
    formField.append('title', title)
    formField.append('description', description)
    formField.append('complete', complete)

    await axios({
      method: "PUT",
      url: `/api/projects/${slug}`,
      data: FormData,
    }).then((response) => {
        console.log(response)
      navigate("/projects");
    });
  }

  return (
    <div className="container">
        <Helmet>
          <title>GestionEmplyes - Update Project</title>
          <meta
            name="description"
            content="GestionEmplyes Update Project Page"
          />
        </Helmet>
      <div
        className="update-form shadow shadow-sm p-3"
        style={{ maxWidth: "600px", margin: "0 auto", marginTop: "50px" }}
      >

        <form onSubmit={e => updateProject(e)}>
        <h1 className="h3 mb-3 fw-normal text-center">Update Project</h1>

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          
          <input
            type="checkbox"
            name="complete"
            defaultChecked={project.complete}
            value={project.complete}
            onChange={(e) => setComplete(!complete)}
          />
          <label className="mb-1 m-2" htmlFor="complete">
            complete
          </label>
        </div>
        <Link className='btn btn-secondary btn-md me-2' to="/projects"> <BsArrowReturnLeft /> Go Back </Link>
        <button className="btn btn-primary">
          Apply Changes
        </button>
    </form>

      </div>
    </div>
  )
}

export default ProjectUpdate