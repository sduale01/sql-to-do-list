console.log('js working');

$(document).ready(function () {
    console.log('jq is working');
    $('#submit-btn').on('click', submitItem);
    // Prevents full page reload when new task is added
    $('#submit-btn').on('click', ((event) => {
        event.preventDefault();
    }));
    getTasksOnServer();

    // will delete a row
    $('#table-body').on('click', '.delete-btn', deleteTask);

    //will update a task to turn its compeletion to: true
    $('#table-body').on('click', '.complete-checkbox', updateTask);
})
// posts new task to database and updates table
function submitItem() {
    console.log('submit clicked');

    // Package the data
    let itemToSend = {
        todo_item: $('#todo-item').val(),
        task_completed: $('#task-completed').val()
    }

    $.ajax({
        method: 'POST',
        url: '/task',
        data: itemToSend
    }).then((response) => {
        console.log(response);

        getTasksOnServer();
    })
}

// Grabs databse table and appends it to page
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
                                        <td align="center"><input type="checkbox" checked disabled></input</td>
                                        <td><button class="btn btn-danger delete-btn" data-deleteid="${task.id}">Delete</button></td>
                                    </tr>`)
            } else {
                $('#table-body').append(`<tr>
                                        <td>${task.todo_item}</td>
                                        <td>${task.task_completed}</td>
                                        <td align="center"><input class="complete-checkbox" data-updateid="${task.id}" type="checkbox"></input></td>
                                        <td><button class="btn btn-secondary delete-btn" data-deleteid="${task.id}">Delete</button></td>
                                    </tr>`)
            }


        }

    });
}

// deletes a task
function deleteTask() {
    const deleteId = $(this).data('deleteid');
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    method: 'DELETE',
                    url: `/task/${deleteId}`
                }).then((response) => {
                    getTasksOnServer();
                })
                swal("Poof! Task has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });


}

// Sets task completed to true
function updateTask() {
    const updateId = $(this).data('updateid');
    console.log(updateId);



    console.log(updateId);

    $.ajax({
        method: 'PUT',
        url: `/task/update/${updateId}`
    }).then((response) => {
        getTasksOnServer();
    })
}