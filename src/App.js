import React, { Component } from 'react';
import PendingOverview from './components/PendingOverview';
import CompletedOverview from './components/CompletedOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import uniqid from 'uniqid';

library.add(faCircle, faCheckCircle, farCircle);

let storedPendingTasks = [];
if (localStorage.getItem('storedPendingTasks')) {
  storedPendingTasks = JSON.parse(localStorage.getItem('storedPendingTasks'));
}

let storedCompletedTasks = [];
if (localStorage.getItem('storedCompletedTasks')) {
  storedCompletedTasks = JSON.parse(localStorage.getItem('storedCompletedTasks'));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      pendingTasks: storedPendingTasks,
      completedTasks: storedCompletedTasks,
    };

    this.changeNewTask = this.changeNewTask.bind(this);
    this.submitNewTask = this.submitNewTask.bind(this);
    this.checkmarkTask = this.checkmarkTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  changeNewTask = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  submitNewTask = (e) => {
    e.preventDefault();
    const taskObj = { task: this.state.task, id: uniqid() };
    const updatedPendingTasks = this.state.pendingTasks.concat(taskObj);
    this.setState({
      task: '',
      pendingTasks: updatedPendingTasks,
    });
    localStorage.setItem('storedPendingTasks', JSON.stringify(updatedPendingTasks));
  };

  checkmarkTask = (e) => {
    const checkedTaskId = e.target.parentNode.parentNode.parentNode.id;
    const currentTask = this.state.pendingTasks.find((taskObj) => {
      return taskObj.id === checkedTaskId;
    });
    const updatedPendingTasks = this.state.pendingTasks.filter((taskObj) => {
      return taskObj.id !== checkedTaskId;
    });
    const updatedCompletedTasks = this.state.completedTasks.concat(currentTask);

    this.setState({
      pendingTasks: updatedPendingTasks,
      completedTasks: updatedCompletedTasks,
    });
    localStorage.setItem('storedPendingTasks', JSON.stringify(updatedPendingTasks));
    localStorage.setItem('storedCompletedTasks', JSON.stringify(updatedCompletedTasks));
  };

  editTask = (e) => {
    const currentInput = e.target.parentNode.parentNode.children[0].children[1].children[0];

    if (e.target.textContent === 'Edit') {
      e.target.textContent = 'Submit';
      currentInput.disabled = false;
      currentInput.focus();
    } else {
      e.target.textContent = 'Edit';
      currentInput.disabled = true;
      localStorage.setItem('storedPendingTasks', JSON.stringify(this.state.pendingTasks));
    }
  };

  changeEditTask = (e) => {
    const taskId = e.target.parentNode.parentNode.parentNode.id;
    const pendingTasksCopy = this.state.pendingTasks.slice();
    const taskIndex = pendingTasksCopy.findIndex((taskObj) => {
      return taskObj.id === taskId;
    });
    pendingTasksCopy[taskIndex] = { task: e.target.value, id: taskId };
    this.setState({
      pendingTasks: pendingTasksCopy,
    });
  };

  deleteTask = (e) => {
    const taskId = e.target.parentNode.parentNode.id;
    if (e.target.classList[1] === 'pending') {
      const updatedPendingTasks = this.state.pendingTasks.filter((taskObj) => {
        return taskObj.id !== taskId;
      });
      this.setState({
        pendingTasks: updatedPendingTasks,
      });
      localStorage.setItem('storedPendingTasks', JSON.stringify(updatedPendingTasks));
    } else if (e.target.classList[1] === 'completed') {
      const updatedCompletedTasks = this.state.completedTasks.filter((taskObj) => {
        return taskObj.id !== taskId;
      });
      this.setState({
        completedTasks: updatedCompletedTasks,
      });
      localStorage.setItem('storedCompletedTasks', JSON.stringify(updatedCompletedTasks));
    }
  };

  render() {
    return (
      <div className="App">
        <h1>My Tasks</h1>

        <form onSubmit={this.submitNewTask}>
          <div className="add-task-row">
            <div className="col">
              <div className="check-col">
                <FontAwesomeIcon icon={['far', 'circle']} />
              </div>
              <div className="desc-col">
                <input
                  type="text"
                  placeholder="Add task here..."
                  value={this.state.task}
                  onChange={this.changeNewTask}
                />
              </div>
            </div>

            <button type="submit">+</button>
          </div>
        </form>

        <div className="status-heading">{this.state.pendingTasks.length} Pending</div>

        <PendingOverview
          tasks={this.state.pendingTasks}
          changeNewTask={this.changeNewTask}
          checkmarkTask={this.checkmarkTask}
          editTask={this.editTask}
          changeEditTask={this.changeEditTask}
          deleteTask={this.deleteTask}
        />

        <div className="status-heading">{this.state.completedTasks.length} Completed</div>
        <CompletedOverview completeTasks={this.state.completedTasks} deleteTask={this.deleteTask} />
      </div>
    );
  }
}

export default App;
