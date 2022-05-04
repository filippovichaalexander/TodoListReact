import React, {FC, ChangeEvent, useState} from 'react';
import './App.css';
import TodoTask from './components/Todotask';
import {ITask} from './interfaces';

const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
      console.log(event.target.value);
      
    } else {
      setDeadline(Number(event.target.value));
    }
  }

  const addTask = (): void => {
    const newTask = {taskName: task, deadLine: deadline}
    setTodoList([...todoList, newTask])
    setTask('');
    setDeadline(0);
  
  }

  const completeTask = (tasknameToDelete: string): void => {
    setTodoList(todoList.filter((task)=> {
        return task.taskName !== tasknameToDelete;
    }))
}

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
        <input 
        value={task}
        type="text" 
        placeholder='Task...' 
        name='task' 
        onChange={handleChange}/>
        <input 
        value={deadline}
        type="number" 
        placeholder='Deadline (in Days)...' 
        name='deadline' 
        
        onChange={handleChange}/>
        </div>
        
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key: number)=>{
          return <TodoTask key={key} task={task} completeTask={completeTask}/>
        })}
      
      </div>
    </div>
  );
}

export default App;
