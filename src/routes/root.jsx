import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Projects</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/projects/1"}>Typeahead / Autosuggestions</Link>
            </li>
            <li>
              <Link to={"/projects/2"}>Project 2</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
