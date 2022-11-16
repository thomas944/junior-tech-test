const express = require('express')
const axios = require('axios')
const router = express.Router()



const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'
const API_KEY = 'mfZ709PhAdgsZ91bOioBS1V3W3XeSm8gQ0N0TkDz'

router
  .route('/:date')
  .get(getImages)

async function getImages(req, res){
  const DATE = req.params.date
  if(!isValidDate(DATE)){
    return res.status(400).json({
      message:'Invalid Date Format'
    })
  }
  const DATE_QUERY = `?earth_date=${DATE}`
  const RAW_URL = BASE_URL+DATE_QUERY+'&api_key=mfZ709PhAdgsZ91bOioBS1V3W3XeSm8gQ0N0TkDz'

  try{
    const response = await axios.get(RAW_URL)
    const data = response.data
    const filtered_repsonse = data.photos.map(image => image.img_src)    
    if (filtered_repsonse.length === 0){
      return res.status(400).json({
        message:'No Images to show for this date'
      })
    }
    res.render('home',
    { name: `Images for ${DATE}`,
      images: filtered_repsonse
    })
    //return res.send(filtered_repsonse)
    
  } catch (error){
    console.log(error)
  }
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

module.exports = router

