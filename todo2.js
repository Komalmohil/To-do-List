let btn = document.getElementById('add');
btn.addEventListener('click', addTodo);

let todoList = document.getElementById('todo-list');

let storedTodos = localStorage.getItem('todos');
let todos = storedTodos ? JSON.parse(storedTodos) : [];

function addTodo() {
  const inp = document.getElementById('input');
  const txt = inp.value;

  if (txt !== '') {
    const todo = {
      id: Date.now(),
      text: txt,
      completed: false
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    addTodoToDOM(todo);
    inp.value = ''; 
  }
}

todos.forEach(todo => addTodoToDOM(todo));

function addTodoToDOM(todo) {
  const li = document.createElement('li');

  const leftContent = document.createElement('div');
  leftContent.classList.add('left-content');

  const radioBtn = document.createElement('input');
  radioBtn.type = 'radio';
  radioBtn.name = 'task'; 
  radioBtn.checked = todo.completed;

  const span = document.createElement('span');
  span.textContent = todo.text;

  radioBtn.addEventListener('change', () => {
    todo.completed = radioBtn.checked;
    localStorage.setItem('todos', JSON.stringify(todos));
    if (todo.completed) {
      span.classList.add('completed');
    } else {
      span.classList.remove('completed');
    }
  });

  leftContent.appendChild(radioBtn);
  leftContent.appendChild(span);

  const rightContent = document.createElement('div');
  rightContent.classList.add('right-content');

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';

  const cross = document.createElement('button');
  cross.textContent = '❌';

  editBtn.classList.add('editbtn');
  editBtn.addEventListener('click', () => {
      const newText = prompt('Edit the task:', todo.text);
      if (newText !== null && newText.trim() !== '') {
          todo.text = newText;
          span.textContent = newText;
          localStorage.setItem('todos', JSON.stringify(todos));
          span.classList.remove('completed'); 
          radioBtn.checked = false; 
     }
  });

  cross.classList.add('deletebtn');
  cross.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      localStorage.setItem('todos', JSON.stringify(todos));
      li.remove();
  });

  rightContent.appendChild(editBtn);
  rightContent.appendChild(cross);

  li.appendChild(leftContent);
  li.appendChild(rightContent);

  todoList.appendChild(li);

  if (todo.completed) {
    span.classList.add('completed');
  }
}