import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompletedOverview = (props) => {
  const { completeTasks, deleteTask } = props;

  const reversedTasks = completeTasks.slice(0).reverse();

  const taskItems = reversedTasks.map((taskObj) => (
    <li key={taskObj.id} id={taskObj.id}>
      <div className="col">
        <div className="check-col">
          <FontAwesomeIcon icon={['fas', 'check-circle']} />
        </div>
        <div className="desc-col">
          <s>{taskObj.task}</s>
        </div>
      </div>
      <div className="ed-col">
        <div className="delete-col completed" onClick={deleteTask}>
          ×
        </div>
      </div>
    </li>
  ));

  return <ul className="overview completed">{taskItems}</ul>;
};

export default CompletedOverview;
