const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

function updateProgress() {
    const items = todoList.querySelectorAll('li');
    const completed = todoList.querySelectorAll('li.completed').length;
    const total = items.length;
    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressFill.style.width = percent + '%';
    progressText.textContent = `${completed} / ${total}`;
}

function addTodo() {
    const value = input.value.trim();
    if (value === "") return;

    const li = document.createElement('li');
    li.textContent = value;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        updateProgress();
    }

    li.onclick = () => {
        li.classList.toggle('completed');
        updateProgress();
    }

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    input.value = "";
    updateProgress();
}

addBtn.addEventListener('click', addTodo);

input.addEventListener('keypress', function(e){
    if(e.key === 'Enter') addTodo();
});
