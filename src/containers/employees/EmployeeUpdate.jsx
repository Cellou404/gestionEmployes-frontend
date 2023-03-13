import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useParams, useNavigate , Link} from "react-router-dom";
import { BsArrowReturnLeft } from 'react-icons/bs'

const EmployeeUpdate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [bio, setBio] = useState("");

  const { navigate } = useNavigate();
  const { slug } = useParams();

  const getEmpoyee = async () => {
    const { data } = await axios.get(
      `/api/employees/${slug}`
    );
    setName(data.name);
    setEmail(data.email);
    setAvatar(data.avatar);
    setDesignation(data.designation);
    setPhone(data.phone);
    setSalary(data.salary);
    setBio(data.bio);

    console.log(data);
  };

  useEffect(() => {
    getEmpoyee();
  }, []);

  const updateEmployee = async () => {

    let formField = new FormData();

    formField.append("name", name);
    formField.append("email", email);
    formField.append("designation", designation);
    formField.append("phone", phone);
    formField.append("salry", salary);
    formField.append("bio", "bio");

    if (avatar !== null) {
      formField.append("avatar", avatar);
    }

    await axios({
      method: "PUT",
      url: `/api/employees/${slug}`,
      data: FormData,
    }).then((response) => {
        console.log(response)
      navigate("/employees");
    });

    // await axios.put(`/api/employees/${slug}`, FormData)
  };
  
   useEffect(() => {
     updateEmployee();
   }, []);

  return (
    <div className="container">
      <Helmet>
        <title>GestionEmplyes - Update Employee Info</title>
        <meta name="description" content="GestionEmplyes update employee info Page" />
      </Helmet>
      <div
        className="update-form shadow shadow-sm p-3"
        style={{ maxWidth: "600px", margin: "0 auto", marginTop: "50px" }}
      >

        <form onSubmit={e => updateEmployee(e)}>
        <h1 className="h3 mb-3 fw-normal text-center">Update Employee Info</h1>

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
                    <label className='mb-1' htmlFor="avatar">Avatar</label>
                    <input 
                        type="file" 
                        className='form-control form-control-md'
                        name='avatar'
                        src={avatar}
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div> 

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="designation">
            Designation
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="mb-1" htmlFor="salary">
            Salary
          </label>
          <input
            type="text"
            className="form-control form-control-md"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="form-group mb-4">
          <label className="mb-1" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="form-control form-control-md"
            name="bio"
            id="bio"
            rows="6"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <Link className='btn btn-secondary btn-md me-2' to="/employees"> <BsArrowReturnLeft /> Go Back </Link>
        <button className="btn btn-primary">
          Apply Changes
        </button>
    </form>

      </div>
    </div>
  );
};

export default EmployeeUpdate;
