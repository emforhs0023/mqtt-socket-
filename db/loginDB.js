var pool = require("../services/database").pool;

module.exports.signUp = function(user_id, cipheredOutput, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_user (user_id, password) VALUES (?, ?)"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[user_id, cipheredOutput],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}

module.exports.information = function(userId, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT user_id, password FROM tbl_user where user_id = ?"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[userId],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                var rows = result.length;

                if(rows>0){
                    callback(true, result[0]["password"]);
                } else {
                   callback(false, null)
                }
            })
    })
}
