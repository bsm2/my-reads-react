import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import {Switch,Route, Link} from 'react-router-dom'
import Search from './Search'
import Home from './Home'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
   
  }

  

  

  render() {
    let { books ,query} = this.state;
    
    
    return (
      
      <div className="app">
        <Switch>
          <Route  exact path="/" component={Home}/>
          <Route exact path="/search" component={Search}/>
        </Switch>
      </div>
      
    )
  }
}

export default BooksApp
