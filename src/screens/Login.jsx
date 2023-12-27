import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [user,setuser] = useState({ email: "" , password: ""  })
  let navigate = useNavigate()
  const handlerSubmit = async(e) =>{
      e.preventDefault();

      const response = await fetch("http://localhost:5000/api/loginuser",{
          method:"post",
         headers:{
          "Content-Type":"application/json"
         },
         body:JSON.stringify({ email:user.email, password: user.password})

      });
      const json = await response.json()
      console.log(json);

      if (!json.success){
          alert("Enter Valid User")
      }
      if (json.success){
        navigate("/");
    }
   
      if (json.success){
        localStorage.setItem("useremail",user.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
      
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
        <button type="submit" class=" m-3 btn btn-success">
          Submit
        </button>
        <Link to="/signup" className="m-3 btn btn-danger">I'm A New User</Link>
      </form>
      </div>
    </>
  )
}

export default Login