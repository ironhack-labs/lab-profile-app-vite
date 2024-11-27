import bgImg from "../assets/oval-bg.png";
import { NavLink } from "react-router-dom";

export default function Homepage() {

  return (
    <main>
      <div style={{ backgroundImage: bgImg }}>
        <div>
          <h1>IronProfile</h1>
          <p>Today we will create an app with authoritation, adding some cool styles!</p>
        </div>
        <div>
          <NavLink to={"/login"}>Log in</NavLink>
          <br />
          <NavLink to={"/register"}>Sign up</NavLink>
        </div>
      </div>
    </main>
  )
}
