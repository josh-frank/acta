const Article = require( "../models" ).Article;
const Edit = require( "../models" ).Edit;

const articleSerializationOptions = {
    attributes: { exclude: [ "updatedAt" ] },
    include: [
        {
            model: Edit,
            where: { current: true },
            attributes: { exclude: [ "current", "articleId", "updatedAt" ] },
            as: "currentEdit"
        },
        {
            model: Edit,
            where: { current: false },
            attributes: { exclude: [ "current", "articleId", "updatedAt" ] },
            as: "pastEdits"
        }
    ],
    order: [ [ { model: Edit, as: "pastEdits" }, "createdAt", "DESC" ] ]
};

module.exports = {
    index( request, response ) {
        return Article.findAll( articleSerializationOptions )
            .then( allArticles => response.status( 201 ).send( allArticles ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    show( request, response ) {
        return Article.findByPk( request.params.id, articleSerializationOptions )
            .then( article => response.status( 201 ).send( article ) )
            .catch( error => response.status( 400 ).send( error ) );
    },
    create( request, response ) {
        return Article.create( { title: request.body.title } )
            .then( newArticle => response.status( 201 ).send( newArticle ) )
            .catch( error => response.status( 400 ).send( error ) );
    }
};