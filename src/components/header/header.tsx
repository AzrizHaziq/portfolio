import uuid from 'uuid/v1'
import React, { Component } from 'react'

const headersLink = [
  {
    'name': 'About Me',
    'href': 'about-me',
  }, {
    'name': 'Projects',
    'href': 'projects',
  }, {
    'name': 'Hobbies',
    'href': 'hobbies',
  }, {
    'name': 'Skills',
    'href': 'skills',
  }, {
    'name': 'Contact Me',
    'href': 'contact-me',
  },
]

export class Header extends Component {
  handleClick = (event, href: string) => {
    const node = document.getElementById(href)
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    event.preventDefault()
  }

  render() {
    return <header>
      <nav className="navbar sticky-top navbar-expand bg-warning d-flex justify-content-center border-bottom shadow-sm">
        <ul className="navbar-nav flex-all-center">
          {headersLink.map(({ name, href }) => (
            <li className="nav-item" key={uuid()}>
              <a className="nav-link text-center" href={'#' + href} onClick={(event) => this.handleClick(event, href)}>
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  }
}
