import { useEffect, useState } from 'react';
import { FetchProjects } from '../../utilities/routes';

import Dropdown from 'react-bootstrap/Dropdown';
import './NavBar.scss';

function NavBar() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {

    // fetches the project route containing the project page data
    FetchProjects().then((projects) => {
      setProjects(projects);
      setProject(projects.filter(project => project.name.includes('4 Day'))[0]);
    });

  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            <img
              src="media/navbar-image.png"
              className="brandImage"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">Home</a>
              </li>

              <Dropdown>
                <Dropdown.Toggle className='project-dropdown nav-link dropdown-toggle active'>
                  Projects
                </Dropdown.Toggle>

                {/* iterate through the projects displayed in the nav-bar dropdown */}
                <Dropdown.Menu>
                  {
                    projects.length > 0 ? (
                      projects.map((project) => (
                        <Dropdown.Item key={project.projectID} href={`/projects?id=${project.projectID}`}>
                          {project.name}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No Projects</Dropdown.Item>
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>

              <li className="nav-item">
                <a className="nav-link" href={`/projects?id=${project.projectID}`}>A's 4 Days Tutor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/careers">Careers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contacts">Contact Us</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/faq">FAQ</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/announcements">Announcements</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;