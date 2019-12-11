const sql = require('mssql');
const dbConfig = require('./dbconfig');

class customLogin{

     static async Registration(data){

        try{
            let pool = await sql.connect(dbConfig.localConfig);
            let result = await pool.request()
                .input('FirstName',sql.NVarChar(50),data.FirstName)
                .input('LastName',sql.NVarChar(50),data.LastName)
                .input('Email',sql.NVarChar(50),data.Email)
                .input('Phone',sql.NVarChar(50),data.Phone)
                .input('Gender',sql.NVarChar(50),data.Gender)
                .input('Matric',sql.Bit,data.Matric)
                .input('Gradution',sql.Bit,data.Gradution)
                .input('Password',sql.NVarChar(50),data.Password)
                .execute('usp_Registration');
        
            sql.close();
            //console.log(result.recordset[0]);
        return result.recordset[0].UserId;
        }catch(e){
            console.log(`Exception in Registration :: ${e}`);
        }    
    }

    static async MapRoleInUser(UserId,RoleId){
        try{
            let pool = await sql.connect(dbConfig.localConfig);
            let result = await pool.request()
                .input('UserId',sql.NVarChar(250),UserId)
                .input('RoleId',sql.NVarChar(250),RoleId)
                .execute('usp_MapRoleInUser');
            console.log(result.recordset[0].result);
            return result.recordset[0].result;
        }catch(e){
            console.log(`Exception : MapRoleInUser() :: ${e.toString()} `);
        }
    }

    static async ValidateLogin(data){
        try{
            let pool = await sql.connect(dbConfig.localConfig);
            let result =await pool.request()
                .input('UserName',sql.NVarChar(250),data.UserName)
                .input('Password',sql.NVarChar(250),data.Password)
                .execute('usp_Login');
            sql.close();
            //console.log(result.recordset[0]);
            return result.recordset[0];
        }catch(e)
        {
            console.log(`Exception in ValidateLogin :: ${e}`);
        }
    }

    static async GetAllRoleByUserId(UserId){
        try{
            let pool = await sql.connect(dbConfig.localConfig);
            let result = await pool.request()
                .input('UserId',sql.NVarChar(250),UserId)
                .execute('usp_GetAllRoleByUserId');
            sql.close();
            //console.log(result.recordset);
            return result.recordset;
        }catch(e){
            console.log(`Exception in GetAllRoleByUserId :: ${e}`);
        }
    }
}

module.exports = {customLogin};