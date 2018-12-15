import React from 'react'
import './navbar.scss';

export const Navbar = () => (
    <nav className="custom-navbar navbar navbar-expand bg-warning navbar-light justify-content-center border-bottom shadow-sm p-0 p-md-2">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#about-me">
            <h5>About Me</h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#project">
            <h5>Projects</h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#hobby">
            <h5>Hobby</h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact-me">
            <h5>Contact Me</h5>
          </a>
        </li>
      </ul>
    </nav>
)
