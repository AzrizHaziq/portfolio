import { hot } from "react-hot-loader"
import React, { Component } from 'react';
import { Footer } from './components/footer/footer'
import { Avatar } from './components/avatar/avatar'
import { Navbar } from './components/navbar/navbar'
import { AboutMe } from './components/about-me/about-me'
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
        <AboutMe/>
      </div>
      <div className="p-4">
        <ContactForm/>
      </div>
      <Footer/>
    </>;
  }
}

export default hot(module)(App)
