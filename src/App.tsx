import * as React from "react";
import './App.css';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './Header';
import TodoApp from './TodoApp/TodoApp';

class App extends React.Component <any, any>{
  
  public render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <nav>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todoApp">To-Do App</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>    
          </nav>
          <Route exact path="/" />      
          <Route path="/todoApp" component={TodoApp}/>      
          <Route path="/blog" />      
        </div>
      </Router>
    )
  }
}
export default App;