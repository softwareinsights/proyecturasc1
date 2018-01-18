const connection = require('../config/db-connection');

const Referencia = {};

Referencia.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT referencia.* FROM referencia    WHERE created_by = ? HAVING referencia.baja IS NULL OR referencia.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT referencia.* FROM referencia    HAVING referencia.baja IS NULL OR referencia.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Referencia leíd@' });
    });
};

Referencia.findById = (idReferencia, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM referencia WHERE idreferencia = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idReferencia, created_by];
    } else {
        query = 'SELECT * FROM referencia WHERE idreferencia = ? HAVING baja IS NULL OR baja = false';
        keys = [idReferencia];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Referencia encontrad@' });
    });
};

Referencia.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idreferencia) AS count FROM referencia';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Referencia contabilizad@' });
    });
};

Referencia.exist = (idReferencia, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM referencia WHERE idreferencia = ?) AS exist';
    keys = [idReferencia];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Referencia verificad@' });
    });
};

Referencia.insert = (Referencia, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO referencia SET ?';
    keys = [Referencia];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Referencia cread@' });
    });
};

Referencia.update = (Referencia, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE referencia SET ? WHERE idreferencia = ? AND created_by = ?';
        keys = [Referencia, Referencia.idreferencia, created_by];
    } else {
        query = 'UPDATE referencia SET ? WHERE idreferencia = ?';
        keys = [Referencia, Referencia.idreferencia];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Referencia actualizad@' });
    });
};

Referencia.remove = (idreferencia, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM referencia WHERE idreferencia = ? AND created_by = ?';
        keys = [idreferencia, created_by];
    } else {
        query = 'DELETE FROM referencia WHERE idreferencia = ?';
        keys = [idreferencia];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Referencia eliminad@' });
    });
};

Referencia.logicRemove = (idreferencia, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE referencia SET baja = 1 WHERE idreferencia = ? AND created_by = ?';
        keys = [idreferencia, created_by];
    } else {
        query = 'UPDATE referencia SET baja = 1 WHERE idreferencia = ?';
        keys = [idreferencia];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Referencia eliminad@' });
    });
};

Referencia.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Referencia;
