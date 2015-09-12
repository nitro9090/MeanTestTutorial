exports.renderMain = function (req, res) {
     res.render('frontPages/login', {
          user: "JSON.stringify(req.user)"
     });
};

exports.renderBoardGameDesign = function(req, res) {
     res.render('frontPages/boardGameDesigns',{
     });
};