const moviesRouter = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://api.themoviedb.org/3'

moviesRouter.get('/search/:query', async (request, response, next) => {
  const query = request.params.query
  const url = `${baseUrl}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  try {
    const results = await axios.get(url)
    console.log(results.data)
    response.json(results.data)
  } catch(err) {
    next(err)
  }
})

moviesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  const url = `${baseUrl}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos`
  console.log(url)
  try {
    const results = await axios.get(url)
    console.log(results.data)
    response.json(results.data)
  } catch(err) {
    next(err)
  }
})

module.exports = moviesRouter