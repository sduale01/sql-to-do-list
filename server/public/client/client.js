console.log('js working');

$(document).ready(function () {
    console.log('jq is working');
    $('#submit-btn').on('click', submitItem);
})

function submitItem() {
    console.log('submit clicked');
    
    // Package the data
    let itemToSend = {
        item: $('#todo-item').val()
    }
}
