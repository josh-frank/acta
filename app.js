const express = require( "express" );
const app = express();

app.use( express.json() );
app.use( express.urlencoded() );

require( "./routes" )( app );

app.get( "/", ( request, response ) => response.send( "Test" ) );

app.listen( process.env.PORT, () => console.log( `Listening: port ${ process.env.PORT }` ) );
