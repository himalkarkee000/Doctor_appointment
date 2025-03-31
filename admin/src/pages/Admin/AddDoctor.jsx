import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form>
      <p>Add Doctor</p>
      <div>
        <div>
          <label htmlFor="doc-image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id='doc-image' hidden/>
          <p>Upload Doctor <br /> picture</p>
        </div>
        <div>
          <div>
            <div>
              <p>Doctor name</p>
              <input type="text" placeholder='Name' required/>
            </div>
            <div>
              <p>Doctor Email</p>
              <input type="email" placeholder='Email' required/>
            </div>
            <div>
              <p>Doctor Passwprd</p>
              <input type="password" placeholder='Password' required/>
            </div>
            <div>
              <p>Doctor Experience</p>
              <select name="" id="">
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Years</option>
                <option value="3 years">3 Years</option>
                <option value="4 years">1 Years</option>
                <option value="5 years">5 Years</option>
                <option value="6 years">6 Years</option>
                <option value="7 years">7 Years</option>
                <option value="8 years">8 Years</option>
                <option value="9 years">9 Years</option>
                <option value="10 years">10 Years</option>
                <option value="10+ years">10+ Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>
     
    </form>
  )
}

export default AddDoctor
