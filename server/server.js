// includes
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

// uses
app.use( express.static( 'server/public' ) );

// globals
const port = 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
})

// routes
app.get( '/items', ( req, res )=>{
    console.log( 'in /items GET' );
    const query = `SELECT * from "items";`;
    pool.query( query ).then( ( results )=>{
        res.send( results.rows );
    }).catch( (err )=>{
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) // end /items GET