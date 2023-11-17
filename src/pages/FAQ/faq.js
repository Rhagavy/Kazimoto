import Accordion from 'react-bootstrap/Accordion';

import { useState, useEffect } from 'react';
import { FetchFAQInformation } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './faq.scss';

function Faq() {

  const [faqInfo, setFaqInfo] = useState([]);

  useEffect(() => {

    // fetches the faq route containing the faq page data
    FetchFAQInformation().then((response) => {
      setFaqInfo(response);
    });

  }, []);

  return (
    <div className="faq-container">
      <NavBar />
      <div id="apply">
        <div id="contentFAQ">

          <div className='faq-container'>
            <section id="faqTop">
              <div className="container-fluid">
                <img src={process.env.PUBLIC_URL + "/media/Questions marks.jpeg"} className="faqImage" />

                <div className="textBlock">
                  <div id="textContainer">
                    <h2> Learn more about Kazimoto Engineering and our services!</h2>
                  </div>
                </div>
              </div>
            </section>

            <section id="faqSection">

              <div className='faq'>
                <h1>Frequently Asked Questions</h1>
                <Accordion className='accordion' defaultActiveKey="0">
                  {/* iterate through the faq questions/answers to be displayed for visitors */}
                  {faqInfo.map((faq, index) => (
                    <Accordion.Item className='item' key={faq.questionID} eventKey={index}>
                      <Accordion.Header className='header'>{faq.question}</Accordion.Header>
                      <Accordion.Body className='body'>
                        {faq.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>

          <section id="contactContainer">
            <div id="outterBox">
              <div id="innerBox">
                <h1>Have more questions? </h1>
                <h1 id="shift">Reach out to us!</h1>
                <a href="/contacts"><button type="button" className="btn btn-secondary contactBtn">Contact Us</button></a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Faq;