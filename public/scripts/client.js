console.log('client.js sourced');

function onReady( ) {
    console.log('document ready');
    
    $.ajax({
        method: 'GET',
        url: '/inventory',
        success: function( response ) {
            console.log('onReady ajax. response ->', response);
            
        }
    });
}

$(document).ready(onReady);
