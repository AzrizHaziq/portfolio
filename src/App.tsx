import React from 'react';
import { hot } from 'react-hot-loader'
import { Hobby } from './components/hobby/hobby'
import { Avatar } from './components/avatar/avatar'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Project } from './components/project/project'
import { AboutMe } from './components/about-me/about-me'
import { SocialLinks } from './components/social-links/social-links'
import { ContactForm } from './components/contract-form/contact-form'

function App() {
  return <>
    <Header/>
    <section className="bg-dark d-flex justify-content-center align-items-center flex-column"
             style={{ height: '100vh' }}>
      <Avatar/>
      <div className="d-flex flex-column flex-md-row">
        <SocialLinks/>
      </div>
    </section>
    <section className="p-4 w-100">
      <AboutMe/>
    </section>
    <section className="p-4 w-100 bg-pattern text-white">
      <Project/>
    </section>
    <section className="p-4 w-100">
      <Hobby/>
    </section>
    <hr/>
    <section className="p-4 w-100">
      <ContactForm/>
    </section>
    <Footer />
  </>
}

export default hot(module)(App)
