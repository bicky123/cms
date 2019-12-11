const sql = require('mssql');
const config = require('./dbconfig');

class User{

    static async GetUserProfileByUserId(UserId){
        try{
            let pool = await sql.connect(config.localConfig);
            let result = await pool.request()
                .output('Message',sql.NVarChar(50),'')
                .input('UserId',sql.NVarChar(250),UserId)
                .execute('usp_GetUserProfileByUserId');
            sql.close();
            //console.log(result.output.Message);
            let Message = result.output.Message ;
            
            return result.recordset[0];
        }catch(e){
            consolelog(`Exception : User :: GetUserProfileByUserId ::: ${e.toString()} `);
        }
    }

}

module.exports = {User};