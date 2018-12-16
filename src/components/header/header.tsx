import React from 'react'

export const Header = () => {
  return <header>
      <nav className="navbar sticky-top navbar-expand bg-warning d-flex justify-content-center border-bottom shadow-sm">
        <ul className="navbar-nav flex-all-center">
          <li className="nav-item">
            <a className="nav-link text-center" href="#about-me">
              About Me
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-center" href="#project">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-center" href="#hobby">
              Hobby
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-center" href="#contact-me">
              Contact Me
            </a>
          </li>
        </ul>
      </nav>
    </header>
}
