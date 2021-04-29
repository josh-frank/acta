const articlesController = require( "../controllers" ).articles;

module.exports = app => {
    app.get( "/articles", articlesController.index );
    app.get( "/articles/:id", articlesController.show );
    app.post( "/articles", articlesController.create );
    app.patch( "/articles/:id", articlesController.addEdit );
};