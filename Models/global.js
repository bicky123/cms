module.exports = {
    global_variable: function(req,res){
        res.locals.CurrentPath = req.path;
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.user = req.user;
    }
}