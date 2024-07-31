import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>React Projects</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/projects/typeAhead"}>Typeahead / Autosuggestions</Link>
            </li>
            <li>
              <Link to={"/projects/jiraVelocityChart"}>Jira Velocity Bar Chart</Link>
            </li>
            <li>
              <Link to={"/projects/fileExplorer"}>File Explorer</Link>
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
