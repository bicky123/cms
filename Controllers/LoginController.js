const passportAuth = require('../Models/passport_auh');
const {customLogin} = require('../Models/customLogin');
const config = require('../Models/dbconfig');
const passportLocal = require('passport-local');
const passport = require('passport');
const validator = require('validator');
const request = require('request');
const Spotify = require('node-spotify-api');
const path = require('path');


module.exports = {
    index: function(req,res){
        res.render('home/index',{
            title: 'Home'
        });
    },

    sigup_Get: function(req,res){
        if(req.isAuthenticated()){
            res.redirect('/admin');
        }
        res.render('home/signup',{
            title:'Register'
        })
    },

    signup_Post: async function(req,res){
        //console.log(req.body);
        try{
            if(req.isAuthenticated()){
                res.redirect('/admin');
            }else{

                let requestBody = req.body;

                let errorMessage = null;
                let errorCode = '000'
                let isValid = true;
                
                let FirstName = requestBody.FirstName.trim() || '';
                let LastName = requestBody.LastName.trim() || '';
                let Email = requestBody.Email.trim() || '';
                let Phone = requestBody.Phone.trim() || '';
                let Gender = requestBody.Gender || 'M';
                let Matric = requestBody.Matric || 0;
                let Gradution = requestBody.Gradution || 0;
                let Password = requestBody.Password || '';

                let data = {
                    FirstName : FirstName,
                    LastName : LastName,
                    Email : Email,
                    Phone : Phone,
                    Gender : Gender,
                    Matric : Matric,
                    Gradution : Gradution,
                    Password : Password
                }

                // let data1 = {
                //     FirstName,LastName ,Email ,Phone,Gender,Matric,Gradution,Password
                // }

                //console.log('data1',data1);

                if(validator.isEmpty(FirstName)){
                    isValid = false;
                    errorMessage = 'Please Enter Your First Name';
                    errorCode = '002';
                }else if(validator.isEmpty(Email)){
                    isValid = false;
                    errorMessage = 'Please Enter Your Email';
                    errorCode = '003';
                }else if(!validator.isEmail(Email)){
                    isValid = false;
                    errorMessage = 'Email Address is not valid';
                    errorCode = '004';
                }else if(validator.isEmpty(Phone)){
                    isValid = false;
                    errorMessage = 'Please Enter Your Phone';
                    errorCode = '005';
                }else if(!validator.isMobilePhone(Phone)){
                    isValid = false;
                    errorMessage = 'Phone is Not Valid';
                    errorCode = '006';
                }else if(validator.isEmpty(Password)){
                    isValid = false;
                    errorMessage = 'Please Enter Your Password';
                    errorCode = '009';
                }else if(Password.length < 6){
                    isValid = false;
                    errorMessage = 'Please Enter Minimum 6 char and Maximum 30 char Password';
                    errorCode = '010';
                }


                if(isValid){

                    let UserId = await customLogin.Registration(data);
                    //console.log(UserId)

                    if(UserId.length > 0){
                        let result = await customLogin.MapRoleInUser(UserId,config.roles.User);
                        if(result > 0){
                            errorMessage = 'Registration Successful..';
                        }else{
                            isValid = false;
                            errorMessage = 'Technical Issue Please Contect To Our Team';
                            errorCode = '012';
                        }
                    }else{
                        isValid = false;
                        errorMessage = 'Email/Phone is Allready Register';
                        errorCode = '011';
                    }   
                }
                
                res.status(200).json({
                    success: isValid ,
                    msg: errorMessage,
                    errorCode: errorCode

                });

            }

        }catch(e){
            res.json({
                success: false ,
                msg: e.toString(),
                errorCode: '001'

            });
        }
        

    },

    login_Get:function(req,res){
        if(req.isAuthenticated()){
            res.redirect('/admin');
        }else{
            res.render('home/login',{
                title:'Login'
            });
        }
        
    },

    login_Post: async function(req,res){
        try{
            if(req.isAuthenticated()){
                res.redirect('/admin');
            }
            else{

                let requestBody = req.body;

                let errorMessage = null;
                let errorCode = '000'
                let isValid = true;
                let returnUrl = '/admin';

                let UserName = requestBody.UserName.trim() || '';
                let Password = requestBody.Password.trim() || '';

                const data = {
                    UserName: UserName ,
                    Password: Password ,
                }

                if(validator.isEmpty(UserName)){
                    isValid = false;
                    errorMessage = 'Please Enter Your Email';
                    errorCode = '002';
                }else if(!validator.isEmail(UserName)){
                    isValid = false;
                    errorMessage = 'Email Address is not valid';
                    errorCode = '003';
                }else if(validator.isEmail(Password)){
                    isValid = false;
                    errorMessage = 'Please Enter Your Password';
                    errorCode = '004';
                }
                
                if(isValid){
                    let result =  await customLogin.ValidateLogin(data);
                    result = result.UserId;
                    if(result.length > 0){

                        req.login(result,function(error){
                            if(error){
                                isValid = false;
                                errorMessage = error;
                                errorCode = '006'
                                console.log(error);
                            }
                        });

                    }else{
                        isValid = false;
                        errorMessage = 'UserId/Password is wrong...';
                        errorCode = '005'
                    }
                    
                }
                
                res.status(200).json({
                    success: isValid,
                    msg : errorMessage,
                    errorCode: errorCode,
                    returnUrl: returnUrl
                });
        }
            
        }catch(e){
            res.status(400).json({
                success: false,
                msg : e.toString(),
                errorCode: '001'
            });
        }
        
    },

    spotify_api : function(req,res){

        const client_Id = '96fac036ea6347f49035fb49be1e1d14';
        const client_Secrate = '5e9e255658da4f1c92dc33f81c026367';
    
        var spotify = new Spotify({
            id: client_Id,
            secret: client_Secrate
          });
        
          spotify.search({ type: 'track', query: 'Workin on it' }, function(err, data) {
            if (err) {
               console.log('Error occurred: ' + err);
            }
            
            res.status(200).json({
                data
            });
            console.log(data); 
          });    
        
            // spotify
            //     .request('https://api.spotify.com/v1/browse/new-releases')
            //     .then(function(data) {
            //         res.status(200).json({
            //                     data
            //                 });
            //         console.log(data); 
            //     })
            //     .catch(function(err) {
            //         console.error('Error occurred: ' + err); 
            //     });

    },

    logoff: (req,res) =>{
        req.logout();
        res.redirect('/app/login');
    },
    
    csv_bulk_upload: async (req,res) => {
        try{
            const csv = require('csvtojson');
            
            var csvFilePath = path.join(__dirname,'../excel/submission.csv');
            console.log(csvFilePath);

            const jsonArray=await csv().fromFile(csvFilePath);
            console.log(jsonArray);

            res.status(200).json({
                data:jsonArray
            });
        }catch(e){
            console.log(e.toString());
        }
    },

    xlsx_bulk_upload: (req,res) => {
        var XLSX = require('xlsx');

        var csvFilePath = path.join(__dirname,'../excel/OpenVio-GTK.xlsx');
        //var csvFilePath = path.join(__dirname,'../excel/rzp.xlsx');
        //console.log()

        var workbook = XLSX.readFile(csvFilePath);
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
        console.log(xlData);

        res.status(200).json({
            data:xlData
        });
    }

}