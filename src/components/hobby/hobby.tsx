import React from 'react'
import uuid from 'uuid/v1'
import hobby from './hobby-list.json'
import './hobby.scss'

const Icon = ({ blog }) => blog === 'Devto'
    ? devtoIcon
    : mediumIcon

const blog = Object.keys(hobby).map((blog: string) => {

  // @ts-ignore
  const list = hobby[blog].map((post: Post, i) => (
      <li className="list-group-item" key={uuid()}>
        <a href={post.link}
           target='_blank'
           rel='noreferrer noopener'
        >{post.title}</a>
      </li>
  ));

  return <div key={uuid()}>
    <Icon blog={blog}/>
    <ul className="list-group mb-4">
      {list}
    </ul>
  </div>
})

export const Hobby = () => {
  return <>
    <a id='hobby'>
      <h1 className="text-center text-uppercase mb-4">Hobby</h1>
    </a>
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-xs-12 col-md-6">
          <h4 className='d-none d-md-block'>Hobby</h4>

          <ul className="list-group mb-4">
            <li className="list-group-item">Reading blog</li>
            <li className="list-group-item">Playing Games</li>
          </ul>
        </div>
        <div className="col-xs-12 col-md-6">
          <hr className='d-block d-md-none'/>
          <h4>Personal Blog</h4>
          <p>In my free time, I write some blog to share my knowledge. Any feedback are most welcome 😁.</p>
          {blog}
        </div>
      </div>
    </div>
  </>
}


interface Hobby {
  [k: string]: Post[]
}

interface Post {
  title: string;
  created_at: string;
  link: string;
}

const devtoIcon =
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 132.000000 65.000000" className="logo mb-2">
      <title>Devto</title>
      <path fill="" d="M0 33v32h11.3c12.5 0 17.7-1.6 21.5-6.5 3.8-4.8 4.4-9 4-28-.3-16.8-.5-18.2-2.7-21.8C30.3 2.5 26.1 1 12 1H0v32zm23.1-19.1c2.3 1.9 2.4 2.3 2.4 18.5 0 15.7-.1 16.7-2.2 18.8-1.7 1.6-3.5 2.2-7 2.2l-4.8.1-.3-20.8L11 12h4.9c3.3 0 5.6.6 7.2 1.9zM46.1 3.6c-2 2.6-2.1 3.9-2.1 29.6v26.9l2.5 2.4c2.3 2.4 2.9 2.5 16 2.5H76V54.1l-10.2-.3-10.3-.3v-15l6.3-.3 6.2-.3V27H55V12h21V1H62.1c-13.9 0-14 0-16 2.6zM87 15.2c2.1 7.9 5.5 20.8 7.6 28.8 3.2 12.3 4.3 15 7 17.7 1.9 2 4.2 3.3 5.7 3.3 3.1 0 7.1-3.1 8.5-6.7 1-2.6 15.2-55.6 15.2-56.8 0-.3-2.8-.5-6.2-.3l-6.3.3-5.6 21.5c-3.5 13.6-5.8 20.8-6.2 19.5C105.9 40 96 1.9 96 1.4c0-.2-2.9-.4-6.4-.4h-6.4L87 15.2z"></path>
    </svg>

const mediumIcon =
    <svg width="45" height="45">
      <title>Medium</title>
      <path fill="#28a745" d="M5 40V5h35v35H5zm8.56-12.627c0 .555-.027.687-.318 1.03l-2.457 2.985v.396h6.974v-.396l-2.456-2.985c-.291-.343-.344-.502-.344-1.03V18.42l6.127 13.364h.714l5.256-13.364v10.644c0 .29 0 .342-.185.528l-1.848 1.796v.396h9.19v-.396l-1.822-1.796c-.184-.186-.21-.238-.21-.528V15.937c0-.291.026-.344.21-.528l1.823-1.797v-.396h-6.471l-4.622 11.542-5.203-11.542h-6.79v.396l2.14 2.64c.239.292.291.37.291.768v10.353z"></path>
    </svg>


