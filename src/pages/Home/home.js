import { useEffect, useState } from 'react';
import { FetchHome } from '../../utilities/routes';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/footer';
import './home.scss';

function Home() {

  const [home, setHome] = useState([]);

  useEffect(() => {
    // fetches the home route containing the home page data
    FetchHome().then((result) => {
      setHome(result[0]);
    });
  }, []);

  return (
    <div className="home-container">
      <NavBar/>
      <div id="contentHome">

        <section id="banner" style={{backgroundImage: `url('${Object.keys(home).length > 0 ? "/media" + home.topBannerImage.split("/media")[1] : ""}')`}}>
          <h2 id="slogan">{home.slogan}</h2>
          <a href="/faq" class="btn btn-primary">Learn More</a>
        </section>

        <section id="intro">
          <h2>More About Us</h2><hr/>
          <div id="content-wrapper">
            <p>{home.introText}</p>
            <img src={Object.keys(home).length > 0 ? "/media" + home.introImage.split("/media")[1] : ""} alt="Section Image" />
          </div>
        </section>

        <section id="ourteam">
          <h2>Our Team</h2>

          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="cards-wrapper">

                  <div class="card">
                    <img src={process.env.PUBLIC_URL + "/media/IMG-1425.jpg"} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Oscar</h5>
                      <p class="card-text">Lead Accountant</p>
                    </div>
                  </div>

                  <div class="card">
                    <img src={process.env.PUBLIC_URL + "/media/IMG-7940.JPEG"} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Ishan</h5>
                      <p class="card-text">Tutor</p>
                    </div>
                  </div>

                  <div class="card">
                    <img src={process.env.PUBLIC_URL + "/media/IMG_8418251.JPEG"} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Regina</h5>
                      <p class="card-text">Tutor</p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev arrow" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next arrow" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
          </div>

          <div id="join">
            <div class="row">
              <div class="cell">
                <img src={'media/contactUs_Home.png'} alt="Section Image" />
              </div>
              <div class="cell">
                <h3>Join our team!</h3>
                <a href="/careers" class="btn btn-primary">Careers</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-us" style={{backgroundImage: `url('${Object.keys(home).length > 0 ? "/media" + home.bottomBannerImage.split("/media")[1] : ""}')`}}>
          <h2>Learn About Our Services...</h2>
          <a href="/contacts" class="btn btn-primary">Contact Us</a>
        </section>

      </div>
      <Footer/>
    </div>
  );
}
export default Home;
