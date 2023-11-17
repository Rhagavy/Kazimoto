import { useEffect, useState } from 'react';
import { FetchSocialLinks } from '../../utilities/routes';
import './footer.scss';

function Footer(args) {

  const [facebookLink, setFacebookLink] = useState(null);
  const [twitterLink, setTwitterLink] = useState(null);
  const [instagramLink, setInstagramLink] = useState(null);
  const [linkedinLink, setLinkedinLink] = useState(null);

  useEffect(() => {

    // Fetch the social media links from the database
    FetchSocialLinks().then((response) => {
      setFacebookLink(response.filter((link) => link.name === "Facebook").length > 0 ? response.filter((link) => link.name === "Facebook")[0].link : "");
      setTwitterLink(response.filter((link) => link.name === "Twitter").length > 0 ? response.filter((link) => link.name === "Twitter")[0].link : "");
      setInstagramLink(response.filter((link) => link.name === "Instagram").length > 0 ? response.filter((link) => link.name === "Instagram")[0].link : "");
      setLinkedinLink(response.filter((link) => link.name === "Linkedin").length > 0 ? response.filter((link) => link.name === "Linkedin")[0].link : "");
    });
    
  }, []);

  return (
    <footer className="text-center text-white" style={{ position: args.display ? "fixed" : "inherit" }}>
      <section>
        <a href={facebookLink} className="btn btn-outline-light btn-floating m-1">
          <i className="bi bi-facebook"/>
        </a>

        <a href={twitterLink} className="btn btn-outline-light btn-floating m-1">
          <i className="bi bi-twitter"/>
        </a>

        <a href={instagramLink} className="btn btn-outline-light btn-floating m-1">
          <i className="bi bi-instagram"/>
        </a>

        <a href={linkedinLink} className="btn btn-outline-light btn-floating m-1">
          <i className="bi bi-linkedin"/>
        </a>
      </section>
      
      <div className="text-center p-2">
        <p>&copy; 2023 Kazimoto Engineering. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;