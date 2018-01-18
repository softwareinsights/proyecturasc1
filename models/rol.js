const connection = require('../config/db-connection');

const Rol = {};

Rol.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT rol.* FROM rol    WHERE created_by = ? HAVING rol.baja IS NULL OR rol.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT rol.* FROM rol    HAVING rol.baja IS NULL OR rol.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Rol leíd@' });
    });
};

Rol.findById = (idRol, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM rol WHERE idrol = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idRol, created_by];
    } else {
        query = 'SELECT * FROM rol WHERE idrol = ? HAVING baja IS NULL OR baja = false';
        keys = [idRol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Rol encontrad@' });
    });
};

Rol.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idrol) AS count FROM rol';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Rol contabilizad@' });
    });
};

Rol.exist = (idRol, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM rol WHERE idrol = ?) AS exist';
    keys = [idRol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Rol verificad@' });
    });
};

Rol.insert = (Rol, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO rol SET ?';
    keys = [Rol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Rol cread@' });
    });
};

Rol.update = (Rol, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE rol SET ? WHERE idrol = ? AND created_by = ?';
        keys = [Rol, Rol.idrol, created_by];
    } else {
        query = 'UPDATE rol SET ? WHERE idrol = ?';
        keys = [Rol, Rol.idrol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Rol actualizad@' });
    });
};

Rol.remove = (idrol, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM rol WHERE idrol = ? AND created_by = ?';
        keys = [idrol, created_by];
    } else {
        query = 'DELETE FROM rol WHERE idrol = ?';
        keys = [idrol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Rol eliminad@' });
    });
};

Rol.logicRemove = (idrol, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE rol SET baja = 1 WHERE idrol = ? AND created_by = ?';
        keys = [idrol, created_by];
    } else {
        query = 'UPDATE rol SET baja = 1 WHERE idrol = ?';
        keys = [idrol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Rol eliminad@' });
    });
};

Rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Rol;
