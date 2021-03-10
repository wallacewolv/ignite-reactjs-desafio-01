import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // function IdRandom() {
  //   return (Math.random() * (100 - 0) + 100);
  // }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // Definir as tasks como um oldState
    // Gerar um id aleatótio
    // Criar uma newTask
    // Input diferente de preenchido colocar um alert
    // Setar o valor do input

    let oldState = tasks;
    let idRandom = (Math.random() * (100 - 0) + 100);// Gerar um id de 0 a 100

    const newTask = {
      id: idRandom,
      title: newTaskTitle,
      isComplete: false,
    }//Setando um novo task

    if (!newTaskTitle) {
      return (alert("Insira um texto no campo"));// Bloqueando criar uma task vazia
    } else if (newTaskTitle) {
      setTasks([...oldState, newTask]); // Basicamante não usa o estado antigo
    }

    setNewTaskTitle(''); // resetar o input
    //console.log(tasks);
    //console.log(newTaskTitle);
  }

  function handleToggleTaskCompletion(id: number): void {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // Fazer um map dos id
    // Comparar o id
    // Setar o mapTasks dentro do setTasks
    const mapTasks = tasks.map((task) =>
      task.id === id ? 
        {...task, isComplete: !task.isComplete,}
        : 
        task
    );

    setTasks(mapTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // Filtrar a task
    // Excluir a Task
 }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}