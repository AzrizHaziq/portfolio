import React, { Component } from 'react';
import { Avatar } from './components/avatar/avatar'
import { Navbar } from './components/navbar/navbar'
import { SocialLinks } from './components/social-links/social-links'

class App extends Component {
  render() {
    return <>
      <Navbar/>
      <div className="container">
        <div className="p-4"></div>
        <div className="d-flex justify-content-center align-items-center">
          <Avatar/>
        </div>
        <div className="p-4"></div>
        <div className="p-3"></div>
        <div className="d-flex justify-content-center align-items-center">
          <SocialLinks/>
        </div>
      </div>
    </>;
  }
}

export default App;

