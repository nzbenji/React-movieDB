import React from 'react'

import Search from './Search'
import {Route} from 'react-router-dom'

import Movie from './Movie'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }

render() { 
return (
  <div>
    <Route exact path='/' component={Search}/>
    <Route path='/movie/:id' component={Movie} />
  </div>
 )  

 }
}


export default App