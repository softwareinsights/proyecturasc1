const connection = require('../config/db-connection');

const Usuario = {};

Usuario.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT usuario.*, _idrol. as rol_idrol , _idstatususuario. as statususuario_idstatususuario FROM usuario INNER JOIN rol as _idrol ON _idrol.idrol = usuario.idrol INNER JOIN statususuario as _idstatususuario ON _idstatususuario.idstatususuario = usuario.idstatususuario   WHERE created_by = ? HAVING usuario.baja IS NULL OR usuario.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT usuario.*, _idrol. as rol_idrol , _idstatususuario. as statususuario_idstatususuario FROM usuario INNER JOIN rol as _idrol ON _idrol.idrol = usuario.idrol INNER JOIN statususuario as _idstatususuario ON _idstatususuario.idstatususuario = usuario.idstatususuario   HAVING usuario.baja IS NULL OR usuario.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Usuario leíd@' });
    });
};

Usuario.findById = (idUsuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM usuario WHERE idusuario = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idUsuario, created_by];
    } else {
        query = 'SELECT * FROM usuario WHERE idusuario = ? HAVING baja IS NULL OR baja = false';
        keys = [idUsuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Usuario encontrad@' });
    });
};

Usuario.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idusuario) AS count FROM usuario';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Usuario contabilizad@' });
    });
};

Usuario.exist = (idUsuario, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM usuario WHERE idusuario = ?) AS exist';
    keys = [idUsuario];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Usuario verificad@' });
    });
};

Usuario.insert = (Usuario, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO usuario SET ?';
    keys = [Usuario];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Usuario cread@' });
    });
};

Usuario.update = (Usuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE usuario SET ? WHERE idusuario = ? AND created_by = ?';
        keys = [Usuario, Usuario.idusuario, created_by];
    } else {
        query = 'UPDATE usuario SET ? WHERE idusuario = ?';
        keys = [Usuario, Usuario.idusuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Usuario actualizad@' });
    });
};

Usuario.remove = (idusuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM usuario WHERE idusuario = ? AND created_by = ?';
        keys = [idusuario, created_by];
    } else {
        query = 'DELETE FROM usuario WHERE idusuario = ?';
        keys = [idusuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Usuario eliminad@' });
    });
};

Usuario.logicRemove = (idusuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE usuario SET baja = 1 WHERE idusuario = ? AND created_by = ?';
        keys = [idusuario, created_by];
    } else {
        query = 'UPDATE usuario SET baja = 1 WHERE idusuario = ?';
        keys = [idusuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Usuario eliminad@' });
    });
};

Usuario.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Usuario;
