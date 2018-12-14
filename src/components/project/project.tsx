import React from 'react'
import uuid from 'uuid/v1'
import projects from './project.json'
import { splitter } from '../../helpers/char-jump'

export const Project = () => {
  return <>
    <a id='project'>
      <h1 className="text-center text-uppercase mb-4 text-warning">{splitter('Projects')}</h1>
    </a>
    <div className="container">
      <div className="row">
        {projectList}
      </div>
    </div>
  </>
}


const projectList = projects.map(({ name, projectTime, description, details }) => (
    <div className="col-xs-12 col-md-6 col-lg-4" key={uuid()}>
      <div className="border shadow p-4 rounded mb-4 bg-dark">
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <h3 className="d-inline-block mr-2 mb-0">{name}</h3>
          <h4 className="d-inline-block text-white-50 mb-0">{projectTime}</h4>
        </div>
        <p className="">{description}</p>

        <hr className='mb-4'/>
        <h4>HighLights</h4>
        <ul className="pl-4">
          {details.map((detail, i) =>
              <li className="" key={i}>{detail}</li>
          )}
        </ul>
      </div>
    </div>
))
