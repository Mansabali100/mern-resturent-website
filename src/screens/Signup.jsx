import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Signup() {

    const [user,setuser] = useState({name: "" , email: "" , password: "" , geolocation: "" })
    let navigate = useNavigate()
    const handlerSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/creatuser",{
            method:"post",
           headers:{
            "Content-Type":"application/json"
           },
           body:JSON.stringify({name:user.name, email:user.email, password: user.password, location:user.geolocation})

        });
        const json = await response.json()
        console.log(json);
        swal({
          title: "Thank You!!!",
          text: "You Have SignUp Successfully",
          icon: "success",
          button: "OK",
        });
        navigate("/login");

        if (!json.success){
            alert("Enter Valid User")
        }
    }
    const onChange = (e) =>{
        setuser ({...user,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className="container">
      <form onSubmit={handlerSubmit}>
      <div class="mb-3">
          <label htmlfor="create user name" class="form-label">
            User Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label htmlfor="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={user.email}
            onChange={onChange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label htmlfor="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div class="mb-3">
          <label htmlfor="exampleInputPassword1" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name="geolocation"
            value={user.geolocation}
            onChange={onChange}
          />
        </div>
        <button type="submit" class=" m-3 btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
      </form>
      </div>
    </>
  );
}

export default Signup;
