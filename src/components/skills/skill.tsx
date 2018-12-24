import './skill.scss'
import uuid from 'uuid/v1'
import skills from './skill.json'
import React, { Component } from 'react'
import { splitter } from '../../helpers/char-jump'

const { advanced, intermediate, basic } = skills

const Badge = ({ skills, bgColor }) => skills.map(skill => (
  <span
    style={{ backgroundColor: bgColor }}
    className="badge badge-warning m-2 p-2 shadow" key={uuid()}
  >
    {skill}
  </span>
))

const Legend = () => (
  <div className='d-flex justify-content-end mt-4'>
    <div className='d-flex flex-column text-black m-2 align-items-center'>
      <div className='square m-2 rounded shadow' style={{ backgroundColor: '#ffc107' }}>&nbsp;</div>
      Advanced
    </div>
    <div className='d-flex flex-column text-black m-2 align-items-center'>
      <div className='square m-2 rounded shadow' style={{ backgroundColor: '#ffd065' }}>&nbsp;</div>
      Intermediate
    </div>
    <div className='d-flex flex-column text-black m-2 align-items-center'>
      <div className='square m-2 rounded shadow' style={{ backgroundColor: 'white' }}>&nbsp;</div>
      Basic
    </div>
  </div>
)

export class Skill extends Component {
  state = {
    search: '',
    advanced,
    intermediate,
    basic,
  }

  handleSearch = (event) => {
    const { value } = event.target
    const searchRegex = new RegExp(value, 'ig')

    const newAdvanced = advanced.filter(advancedSkill => searchRegex.test(advancedSkill))
    const newIntermediate = intermediate.filter(intermediateSkill => searchRegex.test(intermediateSkill))
    const newBasic = basic.filter(basicSkill => searchRegex.test(basicSkill))

    this.setState({
      search: value,
      advanced: newAdvanced,
      intermediate: newIntermediate,
      basic: newBasic,
    })
  }

  render() {
    const { search, advanced, intermediate, basic } = this.state

    return <>
      <a id='skills'>
        <h1 className="text-center text-uppercase mb-4">{splitter('Skills')}</h1>
      </a>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-6">
          <form>
            <div className="form-group">
              <label hidden>Search skills</label>
              <input className="form-control" type="text" value={search} onChange={this.handleSearch}
                     placeholder='typescript, webpack, ...etc'/>
            </div>
          </form>
        </div>
      </div>
      <Badge skills={advanced} bgColor='#ffc107'/>
      <Badge skills={intermediate} bgColor='#ffd065'/>
      <Badge skills={basic} bgColor='white'/>
      <Legend/>
    </>
  }
}


