import './skill.scss'
import uuid from 'uuid/v1'
import React, { Component } from 'react'
import skills from './../../data/skill.json'
import { splitter } from './../../helpers/char-jump'

const { advanced, intermediate, basic, terms } = skills

const Badge = ({ skills, badgeType = 'badge-warning', ...props }) => skills.map(skill => (
    <span
        {...props}
        className={`badge  m-2 p-2 shadow ${badgeType}`} key={uuid()}
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
      <div className='d-flex flex-column text-black m-2 align-items-center'>
        <div className='square m-2 rounded shadow' style={{ backgroundColor: '#666a6d' }}>&nbsp;</div>
        Terms
      </div>
    </div>
)

export class Skill extends Component {
  state = {
    search: '',
    advanced,
    intermediate,
    basic,
    terms,
  }

  handleSearch = (event) => {
    const { value } = event.target
    const searchRegex = new RegExp(value, 'ig')

    const newAdvanced = advanced.filter(advancedSkill => searchRegex.test(advancedSkill))
    const newIntermediate = intermediate.filter(intermediateSkill => searchRegex.test(intermediateSkill))
    const newBasic = basic.filter(basicSkill => searchRegex.test(basicSkill))
    const newTerms = terms.filter(termsSkill => searchRegex.test(termsSkill))

    this.setState({
      search: value,
      advanced: newAdvanced,
      intermediate: newIntermediate,
      basic: newBasic,
      terms: newTerms,
    })
  }

  render() {
    const { search, advanced, intermediate, basic, terms } = this.state

    return <>
      <a id='skills'>
        <h1 className="text-center text-uppercase mb-4">{splitter('Skills')}</h1>
      </a>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-6">
          <form>
            <div className="form-group">
              <label hidden>Search skills</label>
              <input className="form-control p-4" type="text" value={search} onChange={this.handleSearch}
                     placeholder='typescript, webpack, ...etc'/>
            </div>
          </form>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-10">
          <Badge skills={advanced} style={{ backgroundColor: '#ffc107' }}/>
          <Badge skills={intermediate} style={{ backgroundColor: '#f8ff93' }}/>
          <Badge skills={basic} style={{ backgroundColor: 'white' }}/>
          <Badge skills={terms} badgeType='badge-invert' />
        </div>
      </div>
      <Legend/>
    </>
  }
}


