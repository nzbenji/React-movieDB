import React from 'react'
import request from 'superagent'

import { Link, Route,Redirect } from 'react-router-dom'

import { Form, Button } from 'semantic-ui-react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      data: []
    }
    }

    handleChange = event => {
      this.setState({
        searchTerm : event.target.value
      })
    }

    handleSubmit = event => {
      event.preventDefault();
      const URL = 'https://api.themoviedb.org'
      const API_KEY = '81009ccb87e4c64254d9e74c695d113a'
      const MOVIE_URL = `${URL}/3/search/movie?api_key=${API_KEY}&query=${this.state.searchTerm}`

      request.get(MOVIE_URL)
        .then(res => {
          this.setState ({
            data: res.body.results
          })
        })
    
    
    }

    getData = () => {
      return this.state.data.map((el, index) => {
        return ( 
        <li key={index}>
          <Link to={`/movie/${el.id}`}>
            {el.title}
          </Link>
        </li>)
         }) 
    }
 

render() {
  console.log(this.state.data)
  return  <React.Fragment>
    

    <Form onSubmit={this.handleSubmit}> 
            <Form.Field>
              <input onChange={this.handleChange}/>
              <Button positive>SUBMIT</Button>
            </Form.Field>
          </Form>
          {this.getData()}
  </React.Fragment>

  }
}

export default Search
