import React from 'react'
import uuid from 'uuid/v1';
import hobby from './hobby-list.json';

const blog = Object.keys(hobby).map(blog => {

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
    <h5>{blog}</h5>
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
        <div className="col-xs-12 col-md-6" style={{ fontSize: '1.5em' }}>
          <h4>Hobby</h4>

          <ul className="list-group mb-4">
            <li className="list-group-item">Reading blog</li>
            <li className="list-group-item">Playing Games</li>
            <li className="list-group-item">Read some blog</li>
          </ul>
        </div>
        <div className="col-xs-12 col-md-6" style={{ fontSize: '1.5em' }}>
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

