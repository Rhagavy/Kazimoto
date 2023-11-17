import { useEffect, useState } from 'react';
import { ContactEmployee, FetchContact } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './contacts.scss';

function Contact() {

  const [contact, setContact] = useState([]);

  useEffect(() => {

    // fetches the contact route containing the contact page data
    FetchContact().then((contact) => {
      setContact(contact[0]);
    });

  }, []);

  /**
   * Submits contact request form to the backend
   * @param {*} first 
   * @param {*} last 
   * @param {*} email 
   * @param {*} phone 
   * @param {*} message 
   */
  function submitForm(first, last, email, phone, message) {
    const body = {
      firstName: first,
      lastName: last,
      email: email,
      phoneNumber: phone,
      reason: message
    };

    // sends the contact request to the backend
    ContactEmployee(body).then((response) => {
      if (response.status == 201) {
        alert("Your message has been sent. We will get back to you shortly.");

      } else {
        alert("Something went wrong. Please try again later.");
      }
    });
  }

  return (
    <div>
      <NavBar/>

      <div className="contact-us-container"
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: "hidden" }}>

        <div style={{ flex: '1', overflow: "auto" }}>
          <div style={{ color: 'white', width: '400px', margin: '0 auto' }}>
            <div className='title'>
              <span className='contact-details'>
                <h2>Talk with our team</h2>
                {contact.email} - {contact.phoneNumber}
              </span>
            </div>
            <form>
              <label className={'redStar label'}>First Name</label>
              <input type="text" className="form-control" id="first" placeholder="" />
              <label className={'redStar label'}>Last Name</label>
              <input type="text" className="form-control" id="last" placeholder="" />
              <label className={'redStar label'}>Your Email</label>
              <input type="text" className="form-control" id="email" placeholder="" />
              <label className={'redStar label'}>Phone Number</label>
              <input type="text" className="form-control" id="phone" placeholder="" />
              <label className={'redStar label'}>What would you like to discuss? </label>
              <textarea className="form-control" id="message" placeholder="" />
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="bt" id="bt" onClick={() => submitForm(
                document.getElementById('first').value,
                document.getElementById('last').value,
                document.getElementById('email').value,
                document.getElementById('phone').value,
                document.getElementById('message').value,
              )}>
                <span className="msg" id="msg"></span>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Contact;