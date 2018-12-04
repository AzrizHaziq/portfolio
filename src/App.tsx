import React, { Component } from 'react';
import { Footer } from './components/about-me/footer'
import { Avatar } from './components/avatar/avatar'
import { Navbar } from './components/navbar/navbar'
import { ContactForm } from './components/contract-form/contact-form'
import { SocialLinks } from './components/social-links/social-links'

class App extends Component {
  render() {
    return <>
      <Navbar/>
      <div className="bg-dark d-flex justify-content-center align-items-center flex-column"
           style={{ height: '600px' }}>
        <Avatar/>
        <div className="p-4"></div>
        <div className="p-4"></div>
        <div className="d-flex">
          <SocialLinks/>
        </div>
      </div>
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-uppercase">Contact Me</h2>
        </div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <ContactForm/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>;
  }
}

export default App;

