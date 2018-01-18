const connection = require('../config/db-connection');

const Archivo = {};

Archivo.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT archivo.*, _idreferencia. as referencia_idreferencia FROM archivo INNER JOIN referencia as _idreferencia ON _idreferencia.idreferencia = archivo.idreferencia   WHERE created_by = ? HAVING archivo.baja IS NULL OR archivo.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT archivo.*, _idreferencia. as referencia_idreferencia FROM archivo INNER JOIN referencia as _idreferencia ON _idreferencia.idreferencia = archivo.idreferencia   HAVING archivo.baja IS NULL OR archivo.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Archivo leíd@' });
    });
};

Archivo.findById = (idArchivo, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM archivo WHERE idarchivo = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idArchivo, created_by];
    } else {
        query = 'SELECT * FROM archivo WHERE idarchivo = ? HAVING baja IS NULL OR baja = false';
        keys = [idArchivo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Archivo encontrad@' });
    });
};

Archivo.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idarchivo) AS count FROM archivo';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Archivo contabilizad@' });
    });
};

Archivo.exist = (idArchivo, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM archivo WHERE idarchivo = ?) AS exist';
    keys = [idArchivo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Archivo verificad@' });
    });
};

Archivo.insert = (Archivo, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO archivo SET ?';
    keys = [Archivo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Archivo cread@' });
    });
};

Archivo.update = (Archivo, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE archivo SET ? WHERE idarchivo = ? AND created_by = ?';
        keys = [Archivo, Archivo.idarchivo, created_by];
    } else {
        query = 'UPDATE archivo SET ? WHERE idarchivo = ?';
        keys = [Archivo, Archivo.idarchivo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Archivo actualizad@' });
    });
};

Archivo.remove = (idarchivo, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM archivo WHERE idarchivo = ? AND created_by = ?';
        keys = [idarchivo, created_by];
    } else {
        query = 'DELETE FROM archivo WHERE idarchivo = ?';
        keys = [idarchivo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Archivo eliminad@' });
    });
};

Archivo.logicRemove = (idarchivo, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE archivo SET baja = 1 WHERE idarchivo = ? AND created_by = ?';
        keys = [idarchivo, created_by];
    } else {
        query = 'UPDATE archivo SET baja = 1 WHERE idarchivo = ?';
        keys = [idarchivo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Archivo eliminad@' });
    });
};

Archivo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Archivo;
