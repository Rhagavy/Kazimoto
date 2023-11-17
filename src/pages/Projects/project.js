import { useEffect, useState } from 'react';
import { FetchProjects, FetchServices } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './project.scss';

function Project() {

  const projectId = new URL(window.location.href).searchParams.get('id');
  const [services, setServices] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {

    // fetches the project route containing the project page data
    FetchProjects(projectId).then((project) => {
      if (projectId == null) setProject(project[0]);
      else setProject(project);

      // set the background colour of the hero section
      document.getElementById('hero').style.backgroundColor = project.projectColour;
    });

    // fetches the services route containing the services page data
    FetchServices().then((services) => {
      services[0].name = "Exchange Student";
      services[1].name = "Dom Toretto";
      services[2].name = "4.0 Standard";
      services[3].name = "Full-time";

      setServices(services);
    });
  }, []);

  return (
    <div className="project-container">
      <NavBar/>
      <div id="contentProject">

        <section id="hero">
          <div className="row">
            <div className="col-lg-12">
              <div id="project-logo">
                <img src={Object.keys(project).length > 0 ? "/media" + project.logo.split("/media")[1] : ""} />
              </div>
            </div>

            <div className="col-lg-12">
              <div id="project-details">
                <div id="project-details-image">
                  <img src={Object.keys(project).length > 0 ? "/media" + project.projectImage.split("/media")[1] : ""} className="img-fluid" />
                </div>
                <div id="project-details-image-caption">
                  <h1 style={{color: project.projectTextColour ? project.projectTextColour : "white"}}>
                    {project.slogan ? project.slogan : 'Project Section'}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="aboutus">
          <div className="container-fluid">
            <h1>More About Us</h1>
            <article>{project.introduction ? project.introduction : 'Welcome to the Project Page'}</article>
          </div>
        </section>

        <section id="aboutus">
          <div className="container-fluid">
            <h1>Purpose</h1>
            <article>{project.purpose ? project.purpose : 'Welcome to the Project Page'}</article>
          </div>
        </section>

        <section id="services">
          <div className="container-fluid">
            <h1>What we do..</h1>
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">

                    <div className="row">
                      {/* iterates through services in the carousel */}
                      {services.map((service) => (

                        <div className="col-3" key={service.serviceID}>
                          <div className="service">
                            <div className="service-overlay">
                              <p className="widescreen-version">
                                {service.description}
                              </p>
                            </div>
                            <div className="service-image">
                              <img src={Object.keys(service).length > 0 ? "/media" + service.iconImage.split("/media")[1] : ""} alt="service" />
                            </div>
                            <div className="service-caption">
                              <span>{service.name}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>

        <hr style={{ border: "2px solid white" }} />
        <Footer/>
      </div>
    </div>
  );
}
export default Project;
