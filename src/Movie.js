import React from 'react';
import request from 'superagent'


class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const idValue = this.props.match.params.id
    const MOVIE_API = `https://api.themoviedb.org/3/movie/${idValue}?api_key=81009ccb87e4c64254d9e74c695d113a&language=en-US`

    request.get(MOVIE_API)
      .then(res => {
        this.setState({
          data: res.body
        })
      })
  }

    render() {
      const { data } = this.state
      const poster = data.poster_path
      //console.log(poster)
      return ( 
        <div>
          <h1>{data.title}</h1>
          <h3>{data.runtime} minutes</h3>
          <h3>Rating: {data.vote_average}</h3>
          <p>{data.overview}</p>
          <div>
          <img src={`https://image.tmdb.org/t/p/w500${poster}`} />
          </div>
          
        </div>
    )
    }
    
}

export default Movie