$( document ).ready( onReady );

function addItem( e ){
    e.preventDefault();
    let objectToSend = {
        size: $('#sizeIn').val(),
        color: $('#colorIn').val(),
        name: $('#nameIn').val()
    }
    console.log( 'in addItem:', objectToSend );
    $.ajax({
        type: 'POST',
        url: '/items',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getItems();
    }).catch( function( err ){
        alert( 'error adding item:', err );
    })
}

function getItems(){
    $.ajax({
        type: 'GET',
        url: '/items'
    }).then( function( response ){
        let el = $( '#inventoryOut' );
        el.empty();
        for( let i=0; i<response.length; i++){
            el.append( `<li>${ response[i].size} ${ response[i].color} ${ response[i].name}</li>`)
        } //end for
    }).catch( function( err ){
        alert( 'Error getting inventory:', err );
    })
}

function onReady(){
    getItems();
    $( '#addItemButton' ).on( 'click', addItem );
}