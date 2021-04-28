const articlesController = require( "../controllers" ).articles;
const editController = require( "../controllers" ).edit;

module.exports = app => {
    app.get( "/articles", articlesController.index );
    app.get( "/articles/:id", articlesController.show );
    app.post( "/articles", articlesController.create );
};