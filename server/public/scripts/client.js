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
            el.append( `<li>${ response[i].size } ${ response[i].color} ${ response[i].name}
            <button class="sellButton" data-id="${ response[i].id}">Sell</button>
            <button class="togglePendingButton" data-id="${ response[i].id}"
            data-pending="${ response[i].pending}">Pending: ${ response[i].pending }</button></li>`)
        } //end for
    }).catch( function( err ){
        alert( 'Error getting inventory:', err );
    })
}

function sell(){
    const id = $( this ).data( 'id' );
    console.log( 'in sell:', id );
    $.ajax({
        type: 'DELETE',
        url: `/items/${ id }`
    }).then( function( response ){
        console.log( 'back from DELETE:', response );
        getItems();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
}

function onReady(){
    getItems();
    $( '#addItemButton' ).on( 'click', addItem );
    $( '#inventoryOut' ).on( 'click', '.sellButton', sell );
    $( '#inventoryOut' ).on( 'click', '.togglePendingButton', togglePending );
}

function togglePending(){
    const id = $( this ).data( 'id' );
    const pendingStatus = $( this ).data( 'pending' );
    console.log( 'in togglePending:', id, pendingStatus );
    $.ajax({
        type: 'PUT',
        url: `/items/${ id }`,
        data: { newPending: !pendingStatus}
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getItems();
    }).catch( function (err){
        alert( 'error updating:', err );
    })
}