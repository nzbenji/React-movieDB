import React from 'react'
import request from 'superagent'

import { Link } from 'react-router-dom'

import { Form, Button, Card, Image } from 'semantic-ui-react'

const styles = {
    cardTitle: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    cardMedia: {
      maxHeight: 394,
      overflow: 'hidden'
    },
    card: {
      cursor: 'pointer',
      height: 400,
      overflow: 'hidden'
    },
    bgImage: {
      width: '100%'
    }
  };

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      data: [],
      isMouseOver: false
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
    // The subtitle won't render if it's null
    

      return this.state.data.map((el, index) => {
        const subtitle = this.state.isMouseOver ? el.overview : null;
          console.log(el)
        return ( 
            <div>
                <Card
                    style={styles.card}
                    onMouseOver={() => this.setState({isMouseOver: true})}
                    onMouseLeave={() => this.setState({isMouseOver: false})}
                >
                <Link to={`/movie/${el.id}`}>
                    <Image 
                    style={styles.bgImage} 
                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
                </Link>

                    <Card.Content>
                    <Card.Header>{el.title}</Card.Header>
                        <Card.Description>{subtitle}</Card.Description>
                    </Card.Content>

                 </Card>

             </div>
        )
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
