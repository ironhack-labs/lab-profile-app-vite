import { useState } from "react";
import bgImg from "../assets/oval-bg.png";
import useAxiosAPI from "../axiosAPI";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const empty = { username: "", password: "" }
  const [account, setAccount] = useState({ ...empty });
  const [formChanged, setFormChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { axiosPost } = useAxiosAPI();
  const navigate = useNavigate();

  function handleFormInput(e) {
    if (!e.target.name || e.target.name.lenght == 0 || e.target.value === undefined || account[e.target.name] === e.target.value || (!account[e.target.name] && !e.target.value)) {
      return;
    }
    //console.log(e.target.name + ": ", account[e.target.name], " --> ", e.target.value);
    console.log(e.target.name + ": ", e.target.value);
    const accountChanged = { ...account };
    accountChanged[e.target.name] = e.target.value;
    setAccount(accountChanged);
    setFormChanged(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    postData();
  }

  async function postData() {
    setSubmitted(true);
    const { success } = await axiosPost("/login", account);
    if (success) {
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 1000);
    }
    else {
      handleClear(null, false);
    }
  }

  function handleClear() {
    setFormChanged(false);
    setAccount({ ...empty });
    setSubmitted(false);
  }

  return (
    <main>
      <div style={{ backgroundImage: bgImg }}>
        <form onSubmit={handleSubmit} onClick={handleFormInput} onKeyUp={handleFormInput}>
          <div>
            <h1><b>Log in</b></h1>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" onChange={handleFormInput} required={true} />
            <label htmlFor="password">Password:</label>
            <input type={"password"} name="password" onChange={handleFormInput} required={true} />
            <p>
              <span>
                If you don&apos;t have an account yet, you can create your account
              </span>
              {" "}<NavLink to={"/register"}>here</NavLink>.
            </p>
          </div>
          <div>
            <h2><b>Hello!!</b></h2>
            <h2>Welcome to IronProfile!</h2>
            <p>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</p>
            <button type="submit" disabled={(!formChanged || submitted)}>Log in</button>
          </div>
        </form>
      </div >
    </main >
  )
}
