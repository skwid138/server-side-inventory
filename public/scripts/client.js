console.log('client.js sourced');

function onReady( ) {
    console.log('document ready');
    getInventory();

    $('#addButton').on('click', addInventory);
}

function addInventory() {
    console.log('in addInventory');
    // var to hold value from form
    var itemToAdd = $('#addInput').val();
    console.log('addInput ->', itemToAdd);
    
    // var to hold data to send to server
    var objectToSend = {item: itemToAdd};

    // build post request to send to server
    $.ajax({
        method: 'POST', 
        url: '/inventory',
        data: objectToSend, // data hold value we want to send
        success: function (response) {
            console.log('ajax post response ->', response );
            
        }
    });
    getInventory();
}

function getInventory() {
    $.ajax({
        method: 'GET', // type: 'GET',  -- also works
        url: '/inventory',
        success: function (response) {
            console.log('onReady ajax. response ->', response);
            $('#addSection').empty();
            for (var i = 0; i < response.length; i++) {
                var $p = $('<p>');
                 $p.append(response[i].item + '  ');
                $p.data('id', response[i].id); // primary id for each item
                $p.append('<button class="deleteMe">Delete</button>'); // adds delete button to each item
                $('#addSection').append($p);
            }
            //$('#addSection').append($div);
            $('#addInput').val('');
        }
    });
}

$(document).ready(onReady);
