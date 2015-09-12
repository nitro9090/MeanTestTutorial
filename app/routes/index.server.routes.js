module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    
    app.get('/', index.renderMain);
    app.get("/boardGameDesign", index.renderBoardGameDesign);
};