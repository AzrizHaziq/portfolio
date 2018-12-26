import './skill.scss'
import React, { Component } from 'react'

class Legend extends Component {
  render() {
    return (
        <div className='d-flex justify-content-end mt-4'>
          <div className='d-flex flex-column text-black m-2 align-items-center'>
            <div className='square m-2 rounded shadow' style={{ backgroundColor: '#ffc107' }}>&nbsp;</div>
            Advanced
          </div>
          <div className='d-flex flex-column text-black m-2 align-items-center'>
            <div className='square m-2 rounded shadow' style={{ backgroundColor: '#f8ff93' }}>&nbsp;</div>
            Intermediate
          </div>
          <div className='d-flex flex-column text-black m-2 align-items-center'>
            <div className='square m-2 rounded shadow' style={{ backgroundColor: 'white' }}>&nbsp;</div>
            Basic
          </div>
          <div className='d-flex flex-column text-black m-2 align-items-center'>
            <div className='square m-2 rounded shadow' style={{ backgroundColor: '#666a6d' }}>&nbsp;</div>
            Terms
          </div>
        </div>
    )
  }
}

export default Legend;
