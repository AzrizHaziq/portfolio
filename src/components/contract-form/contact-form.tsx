import React, { Component } from 'react'

class ContactForm extends Component {

  state = {
    name: '',
    email: '',
    message: '',
  }

  render() {
    return <>
      <div className="text-center">
        <h2 className="text-uppercase">Contact Me</h2>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="John Smith"/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                       placeholder="johhsmith@example.com"/>
                <small id="emailHelp" className="form-text text-muted">
                  I'll never share your email with anyone else. 😁
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" placeholder="write an essay for me"></textarea>
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