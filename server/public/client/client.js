console.log('js working');

$(document).ready(function () {
    console.log('jq is working');
    $('#submit-btn').on('click', submitItem);
    getTasksOnServer();

    $('#table-body').on('click', '.delete-btn', deleteTask);
})

function submitItem() {
    console.log('submit clicked');
    
    // Package the data
    let itemToSend = {
        item: $('#todo-item').val(),
        taskCompleted: $('#task-completed').val()
    }

    $.ajax({
        method: 'POST',
        url: '/task',
        data: itemToSend
    }).then((response) => {
        getTasksOnServer();
    })
}

function getTasksOnServer() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        // console.log(response);
        //to avoid table duplication
        $('#table-body').empty();

        let tasks = response
        for (let task of tasks) {
            $('#table-body').append(`<tr>
                                        <td>${task.todo_item}</td>
                                        <td>${task.task_completed}</td>
                                        <td><button class="complete-btn">Completed</button></td>
                                        <td><button class="delete-btn" data-deleteid="${task.id}">Delete</button></td>
                                    </tr>`)
            
        }
        
    })
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