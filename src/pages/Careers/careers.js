import React, { useEffect, useState } from 'react';
import { FetchJobPosts, FetchProjects, SubmitJobApplication } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './careers.scss';

function Careers() {
  const limitIncrement = 4;
  
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const [jobLimit, setJobLimit] = useState(4);
  const [application, setApplication] = useState(null);

  useEffect(() => {

    // fetches the job posts route containing the job posts page data
    FetchJobPosts(jobLimit).then((jobPosts) => {
      setJobs(jobPosts);
    });

  }, [jobLimit]);

  useEffect(() => {

    // fetches the projects route containing the projects page data
    FetchProjects().then((projects) => {
      setProjects(projects);
    });

  }, []);

  /**
   * Handles the search functionality for the job posts
   * @param {*} searchQuery 
   * @param {*} datePosted 
   * @param {*} jobType 
   * @param {*} projectType 
   */
  function HandleSearchJobs(searchQuery, datePosted, jobType, projectType) {
    let filter = '';

    if (searchQuery.length > 0) filter = `&searchQuery=${searchQuery}`;
    if (datePosted != 'Date Posted') filter += `&datePosted=${datePosted}`;
    if (jobType != 'Job Type') filter += `&jobType=${jobType}`;
    if (projectType != 'Project') filter += `&projectName=${projectType}`;

    // fetches the job posts with filters applied
    FetchJobPosts(jobLimit, filter).then((jobPosts) => {
      if (jobPosts.length == 0) setSelected([]);
      setJobs(jobPosts);
    });
  }

  /**
   * Handles the submission of the job application to the backend and triggers an email
   * @param {*} first 
   * @param {*} last 
   * @param {*} email 
   * @param {*} phone 
   * @param {*} linkedln 
   * @param {*} portfolio 
   * @param {*} answer 
   * @param {*} resume 
   * @param {*} coverLetter 
   * @param {*} terms 
   */
  function HandleSubmitApplication(first, last, email, phone, linkedln, portfolio, answer, resume, coverLetter, terms) {
    const body = {
      jobPost: selected[0].jobID,
      firstName: first,
      lastName: last,
      email: email,
      phoneNumber: phone,
      linkedin: linkedln,
      portfolio: portfolio,
      reasonToHire: answer,
      resume: resume.files[0],
      coverLetter: coverLetter.files[0]
    };

    // check if the terms of service checkbox is checked
    if (terms) {
      SubmitJobApplication(body).then((response) => {
        setApplication(response.status === 201 ? "sent" : "unsent");
  
        ['first', 'last', 'email',
        'phone', 'linkedln', 'portfolio',
        'answer', 'resume', 'coverLetter'
        ].forEach(id => document.getElementById(id).value = '');
      });
    
    } else setApplication("terms");
  }

  /**
   * Handles the display of the job panel
   * @param {*} id 
   */
  function HandleDisplayJobPanel(id) {
    setSelected([jobs.filter(job => job.jobID === id)[0]]);
    jobs.forEach(job => document.getElementById(job.jobID).className = null);
    document.getElementById(id).className = 'bi bi-arrow-right-circle-fill';
  }

  /**
   * Handles the display of the application panel
   * @param {*} preview 
   */
  function HandlePreviewApplication(preview) {
    if (preview) document.getElementById('application').style.display = 'block';
    else {
      document.getElementById('application').style.display = 'none';
      setApplication(false);
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="job-container">
        <div className="form">
          <input type="text" className="form-control" id="search" placeholder="Search Jobs"/>

          <select className="form-select" id="date-posted" defaultValue={"Date Posted"}>
            <option disabled hidden>Date Posted</option>
            <option value="asc">Oldest Job Posts</option>
            <option value="desc">Newest Job Posts</option>
          </select>

          <select className="form-select" id="job-type" defaultValue={"Job Type"}>
            <option disabled hidden>Job Type</option>
            <option value="Job Type">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select className="form-select" id="project-type" defaultValue={"Project"}>
            <option disabled hidden>Project</option>
            <option value="Project">All Projects</option>
            {projects.map(project => (
              <option
                key={project.projectID}
                value={project.name}
              >{project.name}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={() => HandleSearchJobs(
            document.getElementById('search').value,
            document.getElementById('date-posted').value,
            document.getElementById('job-type').value,
            document.getElementById('project-type').value,

          )}>Search</button>
        </div>

        <div className="inner-container">
          <div className="list">
            {jobs.length > 0 ? jobs.map(job => (
              <div className="job" key={job.jobID} onClick={() => HandleDisplayJobPanel(job.jobID)}>
                <i id={job.jobID}/>
                <div className="title">{job.position}</div>
                <div>Kazimoto Engineering</div>
                <div>{job.location}</div>
                <div className="type">{job.jobType}</div><hr/>
                <div className="description" dangerouslySetInnerHTML={{ __html: job.description }}/>
              </div>
            )) :
            <div className="no-job">
              <label className="bi bi-info-circle-fill title"> No Jobs Found</label><hr/>
              <label className="body">
                <strong>Search suggestions:</strong>
                <ul>
                  <li>Try more general keywords</li>
                  <li>Check your spelling</li>
                  <li>Replace abbreviations with the entire word</li>
                </ul>
              </label>
            </div>
            }
            <button style={{display: jobs.length > 0 ? "block" : "none"}} onClick={() => { setJobLimit(jobLimit + limitIncrement) }}>Load More</button>
          </div>

          <div className="panel">
            {/* displays the currently selected job */}
            {selected.length > 0 ? selected.map(job => (
              <div key={job.jobID}>
                <div className="header">
                  <div className="title">{job.position}</div>
                  <div className="company">Kazimoto Engineering</div>
                  <div className="location">{job.location}</div>
                  <hr/>
                </div>

                <div className="body">
                  <div className="title"><i className="bi bi-briefcase-fill"/> Job Type</div>
                  <div className="type">{job.jobType}</div>
                  <div className="duration">{job.projectName}</div>
                  <br/><br/>

                  <div className="requirements">
                    <div className="title"><i className="bi bi-clipboard-check-fill"/> Requirements</div>
                    <div dangerouslySetInnerHTML={{ __html: job.requirements }}/>
                  </div>

                  <div className="description">
                    <div className="title"><i className="bi bi-file-earmark-text-fill"/> Description</div>
                    <div dangerouslySetInnerHTML={{ __html: job.description }}/>
                  </div>
                </div>

                <hr/>
                <button className="btn btn-primary" onClick={() => HandlePreviewApplication(true)}>Apply</button>&nbsp;&nbsp;
                <i className="bi bi-calendar-event"/> Posted on {new Date(job.createdDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
              </div>
            )) : 
              <div>
                <label className="bi bi-x-circle-fill"> No Job Selected</label><hr/>
              </div>
            }
          </div>
        </div>

        <div className="modal" id="application">
          <div className="modal-content">
            <center><h5>Job Application for {selected.map(job => job.position)}</h5></center><hr/>
            <span onClick={() => HandlePreviewApplication(false)} id="close">&times;</span>
            <div className="row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input type="text" id="first" className="form-control"/>
              </div>

              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input type="text" id="last" className="form-control"/>
              </div>
            </div><br/>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" id="email" className="form-control"/>
              </div>

              <div className="form-group col-md-6">
                <label>Phone Number</label>
                <input type="text" id="phone" className="form-control"/>
              </div>
            </div><br/>

            <div className="row">
              <div className="form-group col-md-6">
                <label>LinkedIn Profile</label>
                <input type="text" id="linkedln" className="form-control"/>
              </div>

              <div className="form-group col-md-6">
                <label>Portfolio</label>
                <input type="text" id="portfolio" className="form-control"/>
              </div>
            </div><br/>

            <div className="row">
              <div className="form-group col-md-12">
                <label>Why do you want to work for us?</label>
                <textarea maxLength={250} id="answer" placeholder="250 Character Limit"/>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Resume</label>
                <input type="file" id="resume" className="form-control"/>
              </div>

              <div className="form-group col-md-6">
                <label>Cover Letter</label>
                <input type="file" id="coverLetter" className="form-control"/>
              </div>
            </div>

            <hr/>
            <div className="row">
              <div className="form-group col-md-12">
                <div className="terms">
                  <input type="checkbox" id="terms" className="form-check-input"/>
                  <label>I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a></label>
                </div>
                <button className="btn btn-primary" onClick={() => HandleSubmitApplication(
                  document.getElementById('first').value,
                  document.getElementById('last').value,
                  document.getElementById('email').value,
                  document.getElementById('phone').value,
                  document.getElementById('linkedln').value,
                  document.getElementById('portfolio').value,
                  document.getElementById('answer').value,
                  document.getElementById('resume'),
                  document.getElementById('coverLetter'),
                  document.getElementById('terms').checked,

                )}>Submit Application</button><br/><br/>

                {application == "sent" ?
                  <div className="alert alert-success" role="alert">
                    <center><h5>Application has been submitted!</h5></center>
                  </div> : application == "unsent" ?

                  <div className="alert alert-danger" role="alert">
                    <center><h5>Application Submission Failed!</h5></center>
                  </div> : application == "terms" ?

                  <div className="alert alert-danger" role="alert">
                    <center><h5>Please agree to the Terms of Service and Privacy Policy!</h5></center>
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Careers;

/*
return (
    <div>
      <NavBar/>
        <div className="alert alert-danger" role="alert">
          <center><h4>Job Postings are currently unavailable!</h4></center>
        </div>
      <Footer display={true}/>
    </div>
  );
*/