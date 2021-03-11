import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PendingOverview = (props) => {
  const { tasks, checkmarkTask, editTask, changeEditTask, deleteTask } = props;

  const reversedTasks = tasks.slice(0).reverse();

  const taskItems = reversedTasks.map((taskObj) => (
    <li key={taskObj.id} id={taskObj.id}>
      <div className="col">
        <div className="check-col">
          <FontAwesomeIcon onClick={checkmarkTask} icon={['far', 'circle']} />
        </div>
        <div className="desc-col">
          <input value={taskObj.task} onChange={changeEditTask} disabled />
        </div>
      </div>
      <div className="ed-col">
        <div className="edit-col" onClick={editTask}>
          Edit
        </div>
        <div className="delete-col pending" onClick={deleteTask}>
          ×
        </div>
      </div>
    </li>
  ));

  return <ul className="overview">{taskItems}</ul>;
};

export default PendingOverview;
