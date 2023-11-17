import React, { useEffect, useState } from 'react';
import { FetchSocialLinks } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './announcements.scss';

function Announcements() {

    const [links, setLinks] = useState([]);

    useEffect(() => {

        // Fetch the social media links from the database
        FetchSocialLinks().then((response) => {
            setLinks(response);
        });

    }, []);

    if (links.length > 0) {
        return (
            <div className="announcements-container"
                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: "hidden" }}>
                <NavBar />
                <div style={{ flex: '1', overflow: "auto" }}>
                    <h1 style={{ color: '#a56a3f' }}>Company Social Media</h1>
                    <div className='social-medias'>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '70%',
                            margin: '0 auto',
                            marginBottom: '10px'
                        }}>
                            {/* iterate through links displaying the listed social media accounts */}
                            {links.map((website) => (
                                <div style={{ width: '50%' }} key={website.id}>
                                    <iframe
                                        src={website.link}
                                        width="400" height="600" style={{ border: 'none', overflow: 'hidden' }} scrolling="no"
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    />
                                    <div onClick={() => { window.location.href = website.link }} className='link-name'>{website.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    
    } else {
        return (
            <div>
              <NavBar/>
                <div className="alert alert-danger" role="alert">
                  <center><h4>No Social Media Accounts are listed!</h4></center>
                </div>
              <Footer display={true}/>
            </div>
          );
    }
}
export default Announcements;