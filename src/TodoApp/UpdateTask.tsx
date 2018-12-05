import * as React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const UpdateTask = (props: any) => {
  return (
    <Router>
      <div className="Task-Item-Edit">
        <Link to="/" className="edit-link arrow-up">X </Link>{/*↑*/}
        <Route exact path="/" />
        <input 
          type="text" 
          className="edit-task" 
          placeholder={`Edit task ${props.id}`} 
          onChange={event => props.changeTask(event)}/>
        <button 
          className="edit-confirm"
          onClick={() => {props.updateTask({id:props.id})}}
        >
          Update Task
        </button>
      </div>
    </Router>
  )
}

export default UpdateTask;