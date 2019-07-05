$( document ).ready( onReady );

function addItem( e ){
    e.preventDefault();
    console.log( 'in addItem' );
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