const Article = require( "../models" ).Article;

module.exports = {
    index( request, response ) {
        return Article.findAll()
            .then( allArticle => response.status( 201 ).send( allArticle ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    create( request, response ) {
        return Article.create( { title: request.body.title } )
            .then( article => response.status( 201 ).send( article ) )
            .catch( error => response.status( 400 ).send( error ) );
    }
};