const Article = require( "../models" ).Article;
const Edit = require( "../models" ).Edit;

module.exports = {
    index( request, response ) {
        return Article.findAll( { include: [ { model: Edit, as: "edits" } ] } )
            .then( allArticles => response.status( 201 ).send( allArticles ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    show( request, response ) {
        return Article.findByPk( request.params.id, { include: [ { model: Edit, as: "edits" } ] } )
            .then( allArticles => response.status( 201 ).send( allArticles ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    create( request, response ) {
        return Article.create( { title: request.body.title } )
            .then( article => response.status( 201 ).send( article ) )
            .catch( error => response.status( 400 ).send( error ) );
    }
};