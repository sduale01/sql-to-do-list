console.log('js working');

$(document).ready(function () {
    console.log('jq is working');
    $('#submit-btn').on('click', submitItem);
    getTasksOnServer();

    // will delete a row
    $('#table-body').on('click', '.delete-btn', deleteTask);

    //will update a task to turn its compeletion to: true
    $('#table-body').on('click', '.complete-btn', updateTask);
})

function submitItem() {
    console.log('submit clicked');
    
    // Package the data
    let itemToSend = {
        todo_item: $('#todo-item').val(),
        task_completed: $('#task-completed').val()
    }
    console.log('this will be posted to the server: ', itemToSend);
    


    $.ajax({
        method: 'POST',
        url: '/task',
        data: itemToSend
    }).then((response) => {
        console.log(response);
        
        getTasksOnServer();
    })
}

function getTasksOnServer() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        console.log(response);
        //to avoid table duplication
        $('#table-body').empty();

        let tasks = response
        for (let task of tasks) {
            if (task.task_completed) {
               $('#table-body').append(`<tr class="tastTableRow">
                                        <td>${task.todo_item}</td>
                                        <td>${task.task_completed}</td>
                                        <td><div></div></td>
                                        <td><button class="delete-btn" data-deleteid="${task.id}">Delete</button></td>
                                    </tr>`)
            }else {
                $('#table-body').append(`<tr>
                                        <td>${task.todo_item}</td>
                                        <td>${task.task_completed}</td>
                                        <td><button class="complete-btn" data-updateid="${task.id}">Completed</button></td>
                                        <td><button class="delete-btn" data-deleteid="${task.id}">Delete</button></td>
                                    </tr>`)
            }
            
            
        }
        
    });
}

function deleteTask() {
    // console.log($(this).data('deleteid'));
    const deleteId = $(this).data('deleteid');

    $.ajax({
        method: 'DELETE',
        url: `/task/${deleteId}`
    }).then((response) => {
        getTasksOnServer();
    })
    
}

// Sets tast completed to true
function updateTask() {
    const updateId = $(this).data('updateid');
    
    
console.log(updateId);

    $.ajax({
        method: 'PUT',
        url: `/task/update/${updateId}`
    }).then((response) => {
        getTasksOnServer();
    })
}