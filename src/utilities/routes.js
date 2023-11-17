import { HttpGet, HttpPost } from "./http-service";

export function FetchHome()
{
  return HttpGet('/api/home-page/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((home) => {
      return home;
    });
}

export function FetchTeamMembers()
{
  return HttpGet('/api/team-members/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((teamMembers) => {
      return teamMembers;
    });
}

export function FetchFAQInformation()
{
  return HttpGet('/api/faqs/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((faq) => {
      return faq;
    });
}

export function FetchServices()
{
  return HttpGet('/api/services/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((services) => {
      return services;
    });
}

export function FetchProjects(projectId=null)
{
  return HttpGet(`/api/projects/${projectId ? projectId : ''}?format=json`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((projects) => {
      return projects;
    });
}

export function FetchJobPosts(jobLimit=4, filter=null)
{
  return HttpGet(`/api/job-posts/filter_job/?format=json&limit=${jobLimit}${filter ? filter : ''}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((jobPosts) => {
      return jobPosts;
    })
    .catch((error) => {
      return error;
    });
}

export function FetchContact()
{
  return HttpGet('/api/contact-page/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((contact) => {
      return contact;
    });
}

export function FetchSocialLinks()
{
  return HttpGet('/api/announcement-page/?format=json')
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((links) => {
      return links;
    })
    .catch((error) => {
      return error;
    });
}

export function SubmitJobApplication(body)
{
  const form = new FormData();
  for (const [key, value] of Object.entries(body)) {
    form.append(key, value);
  }

  return HttpPost('/api/job-applications/', form, false, false)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function ContactEmployee(body)
{
  return HttpPost('/api/contact-forms/', body)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}