import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("Nigeria");
    const [gender, genderchange] = useState("male");
    const [address, addresschange] = useState("");

    const navigate = useNavigate();

    const IsValidate=()=>{
        let isproceed = true;
        let errormessage='Please enter the value in ';
        if(id === null || id === '') {
            isproceed = false;
            errormessage += 'Username';
        }
        if(name === null || name === '') {
            isproceed = false;
            errormessage += ' Full Name';
        }
        if(password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if(email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        if(!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-z0-9]+@[a-zA-z0-9]+\.[A-Za-z]+$/.test(email)) {

            }else {
                isproceed = false;
                toast.warning('Please enter a valid email')
            }

        }
        return isproceed;
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        let regobj = {id,name,password,email,phone,country,gender,address};
        if(IsValidate()) {
            // console.log(regobj);

            fetch("http://localhost:8000/user", {
                method: "POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify(regobj)
            }).then((res)=>{
                toast.success('Registered Successfully!');
                navigate('/login');
            }).catch((err)=>{
                toast.error('Failed :'+err.message);
            });
        }
    }

  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={handlesubmit}>
        <div className="card">
          <div className="card-header">
            <h1>User Registration</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name <span className="errmsg">*</span>
                  </label>
                  <input
                    className="form-control"
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full Name <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Phone Number <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Country <span className="errmsg">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                  >
                    <option>Nigeria</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>China</option>
                    <option>Japan</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="app-check"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                  ></input>
                  <label>Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="app-check"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                  ></input>
                  <label>Female</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Register
            </button>{" "}
            |&nbsp;
            <a className="btn btn-danger">Back</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register