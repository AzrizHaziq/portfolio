import React from 'react'
import { splitter } from '../../helpers/char-jump'

export const AboutMe = () => {
  return <>
    <a id='about-me'>
      <h1 className="text-center text-uppercase mb-4">{splitter('About Me')}</h1>
    </a>
    <div className="row justify-content-md-center">
      <div className="col">
        <p>I'm graduate from Universiti Teknologi Malaysia Skudai(UTM) Johor in Bachelor Degree Computer Science (2016).</p>
        <p>I have about 2+ years of experience as Software Engineer.</p>
        <p>I have experience working on Web and Mobile(Hybrid) Development</p>
        <p>I also keep myself updated in Javascript Ecosystem(ESNext) so that I can improve my programming skills.</p>
        <p>Checkout my LinkedIn
          <a className='mx-1'
             target="_blank"
             rel='noreferrer noopener'
             href='https://www.linkedin.com/in/azriz-haziq-jasni-5876ab143/'>
            here
          </a>
          for more information.
        </p>
      </div>
    </div>
  </>
}

