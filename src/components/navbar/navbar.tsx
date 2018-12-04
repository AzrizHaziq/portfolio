import React from 'react'

export const Navbar = () => (
    <nav className="navbar navbar-expand-sm bg-warning navbar-light justify-content-center border-bottom shadow-sm p-0 p-md-2">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <h3>About Me</h3>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <h3>Projects</h3>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <h3>Hobby</h3>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <h3>Contact Me</h3>
          </a>
        </li>
      </ul>
    </nav>
)