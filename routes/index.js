const { authJwt, verifySignUp } = require( "../middleware" );
const articlesController = require( "../controllers" ).articles;
const authController = require( "../controllers" ).auth;
const usersController = require( "../controllers" ).users;

module.exports = app => {
    // Auth headers //
    app.use( ( request, response, next ) => {
        response.header( "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept" );
        next();
    } );
    // Auth routes //
    app.post( "/signup", [ verifySignUp.checkForDuplicateUsername ], authController.signUp );
    app.post( "/signin", authController.signIn );
    // User routes //
    app.get( "/users/:userId", usersController.show );
    // Article routes //
    app.get( "/articles", articlesController.index );
    app.get( "/articles/:articleId", articlesController.show );
    app.post( "/articles", [ authJwt.verifyToken ], articlesController.create );
    app.patch( "/articles/:articleId", [ authJwt.verifyToken ], articlesController.addEdit );
};