const connection = require('../config/db-connection');

const Permisobase = {};

Permisobase.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisobase.* FROM permisobase    WHERE created_by = ? HAVING permisobase.baja IS NULL OR permisobase.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permisobase.* FROM permisobase    HAVING permisobase.baja IS NULL OR permisobase.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase leíd@' });
    });
};

Permisobase.findById = (idPermisobase, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisobase WHERE idpermisobase = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisobase, created_by];
    } else {
        query = 'SELECT * FROM permisobase WHERE idpermisobase = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisobase];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase encontrad@' });
    });
};

Permisobase.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisobase) AS count FROM permisobase';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase contabilizad@' });
    });
};

Permisobase.exist = (idPermisobase, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisobase WHERE idpermisobase = ?) AS exist';
    keys = [idPermisobase];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase verificad@' });
    });
};

Permisobase.insert = (Permisobase, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisobase SET ?';
    keys = [Permisobase];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase cread@' });
    });
};

Permisobase.update = (Permisobase, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisobase SET ? WHERE idpermisobase = ? AND created_by = ?';
        keys = [Permisobase, Permisobase.idpermisobase, created_by];
    } else {
        query = 'UPDATE permisobase SET ? WHERE idpermisobase = ?';
        keys = [Permisobase, Permisobase.idpermisobase];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase actualizad@' });
    });
};

Permisobase.remove = (idpermisobase, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisobase WHERE idpermisobase = ? AND created_by = ?';
        keys = [idpermisobase, created_by];
    } else {
        query = 'DELETE FROM permisobase WHERE idpermisobase = ?';
        keys = [idpermisobase];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase eliminad@' });
    });
};

Permisobase.logicRemove = (idpermisobase, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisobase SET baja = 1 WHERE idpermisobase = ? AND created_by = ?';
        keys = [idpermisobase, created_by];
    } else {
        query = 'UPDATE permisobase SET baja = 1 WHERE idpermisobase = ?';
        keys = [idpermisobase];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisobase eliminad@' });
    });
};

Permisobase.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisobase;
