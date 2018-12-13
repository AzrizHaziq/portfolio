import React, { Component } from 'react';
import { hot } from "react-hot-loader"
import { Hobby } from './components/hobby/hobby'
import { Footer } from './components/footer/footer'
import { Avatar } from './components/avatar/avatar'
import { Navbar } from './components/navbar/navbar'
import { Project } from './components/project/project'
import { AboutMe } from './components/about-me/about-me'
import { SocialLinks } from './components/social-links/social-links'
import { ContactForm } from './components/contract-form/contact-form'

class App extends Component {
  render() {
    return <>
      <Navbar/>
      <div className="bg-dark d-flex justify-content-center align-items-center flex-column"
           style={{ height: '100vh' }}>
        <Avatar/>
        <div className="d-flex">
          <SocialLinks/>
        </div>
      </div>
      <div className="p-4">
        <AboutMe/>
      </div>
      <div className="p-4 bg-dark text-white">
        <Project/>
      </div>
      <div className="p-4">
        <Hobby/>
      </div>
      <hr />
      <div className="p-4">
        <ContactForm/>
      </div>
      <Footer/>
    </>;
  }
}

export default hot(module)(App)
