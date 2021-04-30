const { verifySignUp } = require( "../middleware" );
const articlesController = require( "../controllers" ).articles;
const authController = require( "../controllers" ).auth;
const usersController = require( "../controllers" ).users;

module.exports = app => {
    app.use( ( request, response, next ) => {
        response.header( "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept" );
        next();
    } );
    app.post( "/users/signup", [ verifySignUp.checkForDuplicateUsername ], authController.signUp );
    app.post( "/users/signin", authController.signIn );
    app.get( "/articles", articlesController.index );
    app.get( "/articles/:id", articlesController.show );
    app.post( "/articles", articlesController.create );
    app.patch( "/articles/:id", articlesController.addEdit );
};