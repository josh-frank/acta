const articlesController = require( "../controllers" ).articles;
const editController = require( "../controllers" ).edit;

module.exports = app => {
    app.get( "/articles", articlesController.index );
    app.post( "/articles", articlesController.create );
};