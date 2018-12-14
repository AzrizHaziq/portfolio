import React, { Component } from 'react'
import { splitter } from '../../helpers/char-jump'

class ContactForm extends Component {

  state = {
    name: '',
    email: '',
    message: '',
  }

  render() {
    return <>
      <a id='contact-me'>
        <h1 className="text-center text-uppercase mb-4">{splitter('Contact Me')}</h1>
      </a>
      <div className="container">
        <div className="row justify-content-md-center mb-4">
          <div className="col-md-8">
            <form>
              <div className="form-group mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control p-4" id="name" placeholder="John Smith"/>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control p-4" id="email" aria-describedby="emailHelp"
                       placeholder="johhsmith@example.com"/>
                <small id="emailHelp" className="form-text text-muted">
                  I'll never share your email with anyone else. 😁
                </small>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="message">Message</label>
                <textarea className="form-control p-4" id="message" placeholder="write an essay for me"></textarea>
              </div>
              <button type="submit" className="btn btn-warning">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>;
  }
}

export {
  ContactForm
}
