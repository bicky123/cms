const {customLogin} = require('./customLogin');

class roleWiseAuth {

    static notAllowAnnonmus()
    {
        return (req,res,next) => {
            try{
                if(req.isAuthenticated()){
                    next();
                }else{
                    res.redirect('/app/login?next=' +req.path);
                }
            }catch(e){
                res.redirect('/app/login?next=' +req.path);
            }
        }
    }

    static roleAuth(roles){
        try{
            return(req,res,next) => {

                if(req.isAuthenticated()){
                    roles = roles + '';
                    const allowedRoles = roles.split(',');
                    
                    let isValid = true;
                    
                    //console.log('roles : ',allowedRoles);

                    customLogin.GetAllRoleByUserId(req.user).then(dbAllowedRoles => {
                        dbAllowedRoles.forEach(element => {
                            allowedRoles.forEach(role => {
    
                                if(element.Role.toLowerCase() == role.toLowerCase())
                                {
                                    isValid = false;
                                    next();
                                }
                            });
                        });

                    }).catch(error => {
                        res.redirect('/admin?next='+req.path);
                        //console.log(`error:roleAuth:: ${error} `);
                    })

                    

                    if(!isValid){
                        res.redirect('/admin?next='+req.path);
                    }
                }else{
                    res.redirect('/app/login?next='+req.path);
                }
            }
            

        }catch(e){
            res.redirect('/app/login?next='+req.path);
        }
    }
}

module.exports = {roleWiseAuth};