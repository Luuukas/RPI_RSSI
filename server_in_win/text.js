var mysql = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',             //主机
    user: 'root',                  //MySQL认证用户名
    password: 'zhuang',         //MySQL认证用户密码
    database: 'helping'
});
//创建一个connection
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});
//执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('The solution is: ', rows[0].solution);
});

// 增
exports.addUser = function (userId, userName, userPhone) {
    var userAddSql = 'INSERT INTO user_info(user_id,user_name,user_phone) VALUES(?,?,?)';
    var userAddSql_Params = [userId, userName, userPhone];
    //增
    connection.query(userAddSql, userAddSql_Params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

exports.changeUser = function (userId, userName, userPhone) {
    var userModSql = 'UPDATE user_info SET user_name = ?, user_phone = ? WHERE user_id = ?';
    var userModSql_Params = [userName, userPhone, userId];
    //改
    connection.query(userModSql, userModSql_Params, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

exports.checkAllUser = function () {
    var userGetSql = 'SELECT * FROM user_info';
    //查
    connection.query(userGetSql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

exports.checkUser = function (userId) {
    return new Promise((resolve) => {
        var userGetSql = 'SELECT * FROM user_info where user_id='+userId;
        //查
        connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
    
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('-----------------------------------------------------------------\n\n');
            resolve(result);
        });
        
    });
    // var userGetSql = 'SELECT * FROM user_info where user_id='+userId;
    // //查
    // connection.query(userGetSql, function (err, result) {
    //     if (err) {
    //         console.log('[SELECT ERROR] - ', err.message);
    //         return;
    //     }

    //     console.log('--------------------------SELECT----------------------------');
    //     console.log(result);
    //     console.log('-----------------------------------------------------------------\n\n');
    //     return(result);
    // });

}

exports.deleteUser = function (userId) {
    var userDelSql = 'DELETE FROM user_info where user_id='+userId;
    //删
    connection.query(userDelSql, function (err, result) {
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows', result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

//关闭connection
// connection.end(function (err) {
//     if (err) {
//         return;
//     }
//     console.log('[connection end] succeed!');
// });