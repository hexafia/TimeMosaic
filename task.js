document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const tasks = [];

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    function generateCalendar(month, year) {
        document.getElementById('calendar-month').textContent = monthNames[month] + ' ' + year;
        calendar.innerHTML = ''; 
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.textContent = day;
            dayHeader.classList.add('day-header');
            calendar.appendChild(dayHeader);
        });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.classList.add('day');

            dayCell.addEventListener('click', () => {
                showModal(day, month, year);
            });

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            calendar.appendChild(dayCell);
        }
    }

    generateCalendar(month, year);

    const modal = document.getElementById('task-modal');
    const modalClose = modal.querySelector('.close');
    const submitButton = modal.querySelector('.modal-submit');

    function displayTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.name + " (" + task.dueDate + ")";
            if (task.completed) {
                listItem.style.textDecoration = "line-through";
                listItem.innerHTML += ' &#10004;';
            }
            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.onclick = () => {
                task.completed = !task.completed; 
                displayTasks(); 
            };
            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
        });
    }

    function showModal(day, month, year) {
        modal.style.display = "block";
        modal.querySelector('.modal-title').textContent = `Add task for ${day}/${month + 1}/${year}`;
        
        // Reset modal inputs
        modal.querySelector('#modal-task').value = '';
        modal.querySelector('#modal-date').value = '';
        modal.querySelector('#modal-time').value = '';

        submitButton.onclick = (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            const taskName = modal.querySelector('#modal-task').value;
            const taskDate = modal.querySelector('#modal-date').value;
            const taskTime = modal.querySelector('#modal-time').value;

            if (taskName && taskDate && taskTime) {
                const task = {
                    name: taskName,
                    dueDate: `${taskDate} ${taskTime}`,
                    completed: false,
                };
                tasks.push(task);
                displayTasks();
                modal.style.display = "none"; // Close modal
            }
        };
    }
    
    modalClose.onclick = () => modal.style.display = "none";

    // Close modal if the user clicks outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Prevent form submission in task manager
    const taskForm = document.getElementById('task-form');
    taskForm.onsubmit = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page

        const taskName = document.getElementById('task').value;
        const taskDate = document.getElementById('due-date').value;
        const taskTime = document.getElementById('task-time').value;

        if (taskName && taskDate && taskTime) {
            const task = {
                name: taskName,
                dueDate: `${taskDate} ${taskTime}`,
                completed: false,
            };
            tasks.push(task);
            displayTasks();
            taskForm.reset(); // Reset the form
        }
    };
});
