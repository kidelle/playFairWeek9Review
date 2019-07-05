$( document ).ready( onReady );

function addItem( e ){
    e.preventDefault();
    console.log( 'in addItem' );
}

function onReady(){
    $( '#addItemButton' ).on( 'click', addItem );
}