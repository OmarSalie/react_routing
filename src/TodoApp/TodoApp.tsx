// ==========================================================================================================================================
// IMPORTS
// ==========================================================================================================================================
import * as React from 'react';
import './TodoApp.css'
import todoApi from './todoApi';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import UpdateTask from './UpdateTask';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// ==========================================================================================================================================
// MAIN CLASS
// ==========================================================================================================================================

class TodoApp extends React.Component <any, any> {
  public state = {
    pendingTask: undefined,
    list: undefined,
    tasks: [] as any[],
    display: undefined,
    search: undefined,
    pendingUpdateTask: undefined
  }

  constructor(props: any) {
    super(props);
  }
// ======================================================================================================================================
// Create New Task Methods
// ======================================================================================================================================
  enterNewTask = (props: any) => {
    this.setState({ pendingTask: props.target.value });
  }

  createNewTask = (e: any) => {
    e.preventDefault();
    todoApi.create({
      task: this.state.pendingTask,
      done: false,
      list: this.state.list
    })
    this.checkDisplay();
  }

// ======================================================================================================================================
// Load different displays
// ======================================================================================================================================

  loadAll = () => {
    todoApi.filterBy('list', this.state.list)
    .then(
      (result) =>  {
        this.setState({tasks: result});
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  loadCompleted = () => {
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['done'] == true;
        })
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

  loadIncomplete = () => {
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['done'] == false;
        })
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

// ======================================================================================================================================
// Search Methods
// ======================================================================================================================================
  changeSearch = (event: any) => {
    this.setState({ search: event.target.value }, () => {
      this.loadSearched();
    });
  }

  loadSearched = () => {
    let searchFor = this.state.search
    todoApi.filterBy('list', this.state.list)
    .then(
      (specificList) => {
        const result = specificList.filter(
          function(result) {
          return result['task'].includes(searchFor);
        })
        this.setState({
          tasks: result
        })
      }
    )
    .catch(
      (e) => {
        console.log(e);
      }
    )
  }

// ======================================================================================================================================
// Create New Task Methods
// ======================================================================================================================================
  componentWillMount = () => {
    this.loadAll();
    this.defaultList();
    this.defaultDisplay();
  }

// ======================================================================================================================================
// Displays
// ======================================================================================================================================
  defaultDisplay = () => {
    this.setState({
      display: "all"
    }, () => {
      this.loadAll();
    })
  }

  defaultList = () => {
    this.setState({
      list: "list1"
    }, () => {
      this.loadAll();
    })
  }

  displayComplete = () => {
    this.setState({
      display: "complete"
    }, () => {
      this.loadCompleted();
    })
  }

  displayIncomplete = () => {
    this.setState({
      display: "incomplete"
    }, () => {
      this.loadIncomplete();
    })
  }

  checkDisplay = () => {
    if(this.state.display == "all") {
      this.loadAll();
    }
    if(this.state.display == "complete") {
      this.loadCompleted();
    }
    if(this.state.display == "incomplete") {
      this.loadIncomplete()
    }
  }
// ======================================================================================================================================
// Task Edit Item
// ======================================================================================================================================
  deleteTask = (props: any) => {
    todoApi.remove(props.id)

    this.checkDisplay();
  }

  updateDoneTrue = (props: any) => {
    todoApi.update(props.id, { done: true })

    this.checkDisplay();
  }

  updateDoneFalse = (props: any) => {
    todoApi.update(props.id, { done: false })
    
    this.checkDisplay();
  }
// ======================================================================================================================================
// Task Edit Item
// ======================================================================================================================================
  changeUpdateTask = (e: any) => {
    this.setState({
      pendingUpdateTask: e.target.value
    })
  }

  updateTask = (props: any) => {
    todoApi.update(props.id, { task: this.state.pendingUpdateTask })

    this.checkDisplay();
  }

  changeList = (event: any) => {
    this.setState({ list: event.target.value }, () => {
      this.checkDisplay();
    });    
  }  
  
  public render() {
    console.log(this.state.display)
    return (
      // <TodoList 
      //   pendingTask={this.state.pendingTask}
      //   list={this.state.list}
      //   tasks={this.state.tasks}
      //   display={this.state.display}
      //   search={this.state.search}
      //   pendingUpdateTask={this.state.pendingUpdateTask}

      //   enterNewTask={this.enterNewTask}
      //   createNewTask={this.createNewTask}
      //   changeSearch={this.changeSearch}
      //   deleteTask={this.deleteTask}
      //   updateDoneTrue={this.updateDoneTrue}
      //   updateDoneFalse={this.updateDoneFalse}
      //   changeUpdateTask={this.changeUpdateTask}
      //   updateTask={this.updateTask}
      //   changeList={this.changeList}
      // />
      <Router>
        <div className="Todo-App">
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <Paper>
                <div className="Task-Lists-Select">
                  <select value={this.state.list} onChange={ event => this.changeList(event) } className="dropdown-list">
                    <option value="list1">List 1</option>
                    <option value="list2">List 2</option>
                    <option value="list3">List 3</option>
                  </select>
                  {/* <input type="radio" value="list1" name="list" checked={props.list === "list1"} onChange={ event => props.changeList(event) }/>
                  <span>List 1 |</span>
                  <input type="radio" value="list2" name="list" checked={props.list === "list2"} onChange={ event => props.changeList(event) }/>
                  <span>List 2 |</span>
                  <input type="radio" value="list3" name="list" checked={props.list === "list3"} onChange={ event => props.changeList(event) }/>
                  <span>List 3</span> */}
                </div>
              </Paper>
            </Grid>
          </Grid>
          
          <div className="New-Task">
            <input 
              placeholder="Enter new task"
              className="New-Task-Input"
              onChange={e => this.enterNewTask(e)} />
            <button
              className="New-Task-Button"
              onClick={this.createNewTask} >
                Add Task
            </button>
          </div>
          <div className="Task-Display">
            <input 
              placeholder="Search for task ➤"
              className="Task-Display-Search searchBar" 
              onChange={e => this.changeSearch(e)}
            />
            <button className="Task-Display-All filter-buttons" onClick={this.defaultDisplay}>ALL ➤</button>
            <button className="Task-Display-Incomplete filter-buttons" onClick={this.displayIncomplete}>TO-DO ➤</button>
            <button className="Task-Display-Complete filter-buttons" onClick={this.displayComplete}>DONE ➤</button>
          </div>
          <div className="Task-List">
            <TaskList 
              tasks = {this.state.tasks}
              updateTrue = {this.updateDoneTrue}
              updateFalse = {this.updateDoneFalse}
              delete = {this.deleteTask}
              
              changeTask = {this.changeUpdateTask}
              updateTask = {this.updateTask} />
          </div>
        </div>
      </Router>
    )
  }
}

export default TodoApp;
// ==========================================================================================================================================
// END OF MAIN CLASS
// ==========================================================================================================================================

// ==========================================================================================================================================
// COMPONENTS
// ==========================================================================================================================================
// const TodoList = (props: any) => {
//   return (
//     <Router>
//         <div className="Todo-App">
//           <Grid container spacing={8}>
//             <Grid item xs={2}>
//               <Paper>
//                 <div className="Task-Lists-Select">
//                   <select value={props.list} onChange={ event => props.changeList(event) } className="dropdown-list">
//                     <option value="list1">List 1</option>
//                     <option value="list2">List 2</option>
//                     <option value="list3">List 3</option>
//                   </select>
//                   {/* <input type="radio" value="list1" name="list" checked={props.list === "list1"} onChange={ event => props.changeList(event) }/>
//                   <span>List 1 |</span>
//                   <input type="radio" value="list2" name="list" checked={props.list === "list2"} onChange={ event => props.changeList(event) }/>
//                   <span>List 2 |</span>
//                   <input type="radio" value="list3" name="list" checked={props.list === "list3"} onChange={ event => props.changeList(event) }/>
//                   <span>List 3</span> */}
//                 </div>
//               </Paper>
//             </Grid>
//           </Grid>
          
//           <div className="New-Task">
//             <input 
//               placeholder="Enter new task"
//               className="New-Task-Input"
//               onChange={e => props.enterNewTask(e)} />
//             <button
//               className="New-Task-Button"
//               onClick={props.createNewTask} >
//                 Add Task
//             </button>
//           </div>
//           <div className="Task-Display">
//             <input 
//               placeholder="Search for task ➤"
//               className="Task-Display-Search searchBar" 
//               onChange={e => props.changeSearch(e)}
//             />
//             <button className="Task-Display-All filter-buttons" onClick={props.defaultDisplay}>ALL ➤</button>
//             <button className="Task-Display-Incomplete filter-buttons" onClick={props.displayIncomplete}>TO-DO ➤</button>
//             <button className="Task-Display-Complete filter-buttons" onClick={props.displayComplete}>DONE ➤</button>
//           </div>
//           <div className="Task-List">
//             <TaskList 
//               tasks = {props.state.tasks}
//               updateTrue = {props.updateDoneTrue}
//               updateFalse = {props.updateDoneFalse}
//               delete = {props.deleteTask}
              
//               changeTask = {props.changeUpdateTask}
//               updateTask = {props.updateTask} />
//           </div>
//         </div>
//       </Router>
//   )
// }
// ==========================================================================================================================================
// List containing to-do items (Stateless component)
// ==========================================================================================================================================

const TaskList = (props: any) => {
  let items = [] as any[];
  if(props.tasks != 'undefined'){
    for(let i = 0; i < props.tasks.length; i++){
      items.push(
        <span>
          <li 
            className="list-items" 
            key={props.tasks[i].id}>
            <span className="edit-buttons-span">
              {props.tasks[i].done
                ? <button className="edit-buttons" onClick={() => {props.updateFalse({ id: props.tasks[i].id })}}>ToDo</button>
                : <button className="edit-buttons" onClick={() => {props.updateTrue({ id: props.tasks[i].id })}}>Done</button>}
              {/* <button className="edit-buttons" onClick={() => {props.updateTrue({ id: props.tasks[i].id })}}>Done</button>
              <button className="edit-buttons" onClick={() => {props.updateFalse({ id: props.tasks[i].id })}}>To-Do</button> */}
              <button className="edit-buttons" onClick={() => {props.delete({ id: props.tasks[i].id })}}>
                X
              </button>
            </span>
            {props.tasks[i].done 
              ? <span className="item-status"><del><Link className="edit-link" to={`/${props.tasks[i].id}`} >{props.tasks[i].task}</Link></del></span> 
              : <span className="item-status"><Link className="edit-link" to={`/${props.tasks[i].id}`} >{props.tasks[i].task}</Link></span>
            }
            {/* <Link to={`/${tasks[i].id}`} >{tasks[i].task}</Link> */}
            <Route 
              exact path={`/${props.tasks[i].id}`} 
              component={UpdateTask}
              render = { () => 
                <UpdateTask 
                  id={props.tasks[i].id} 
            
                  changeTask = {props.changeTask}
                  updateTask = {props.updateTask} /> 
              }
            />
          </li>
          {/* <li key={tasks[i].id}> {tasks[i].task} {tasks[i].done && <span> [DONE]</span>} </li> */}
          
        </span>
      )
    }
  }
  return (
    <div className="Task-List-UL">
      <ul>
        {items}
      </ul>
    </div>
  )
}

// ==========================================================================================================================================
// Link edit task item (Stateless component)
// ==========================================================================================================================================

const UpdateTask = (props: any) => {
  return (
    <Router>
      <div className="Task-Item-Edit">
        <Link to="/todoApp" className="edit-link arrow-up">X </Link>{/*↑*/}
        <Route exact path="/todoApp" />
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