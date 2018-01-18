const connection = require('../config/db-connection');

const Tipoobra = {};

Tipoobra.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tipoobra.* FROM tipoobra    WHERE created_by = ? HAVING tipoobra.baja IS NULL OR tipoobra.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tipoobra.* FROM tipoobra    HAVING tipoobra.baja IS NULL OR tipoobra.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra leíd@' });
    });
};

Tipoobra.findById = (idTipoobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tipoobra WHERE idtipoobra = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoobra, created_by];
    } else {
        query = 'SELECT * FROM tipoobra WHERE idtipoobra = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra encontrad@' });
    });
};

Tipoobra.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtipoobra) AS count FROM tipoobra';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra contabilizad@' });
    });
};

Tipoobra.exist = (idTipoobra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tipoobra WHERE idtipoobra = ?) AS exist';
    keys = [idTipoobra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra verificad@' });
    });
};

Tipoobra.insert = (Tipoobra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tipoobra SET ?';
    keys = [Tipoobra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra cread@' });
    });
};

Tipoobra.update = (Tipoobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoobra SET ? WHERE idtipoobra = ? AND created_by = ?';
        keys = [Tipoobra, Tipoobra.idtipoobra, created_by];
    } else {
        query = 'UPDATE tipoobra SET ? WHERE idtipoobra = ?';
        keys = [Tipoobra, Tipoobra.idtipoobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra actualizad@' });
    });
};

Tipoobra.remove = (idtipoobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tipoobra WHERE idtipoobra = ? AND created_by = ?';
        keys = [idtipoobra, created_by];
    } else {
        query = 'DELETE FROM tipoobra WHERE idtipoobra = ?';
        keys = [idtipoobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra eliminad@' });
    });
};

Tipoobra.logicRemove = (idtipoobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoobra SET baja = 1 WHERE idtipoobra = ? AND created_by = ?';
        keys = [idtipoobra, created_by];
    } else {
        query = 'UPDATE tipoobra SET baja = 1 WHERE idtipoobra = ?';
        keys = [idtipoobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoobra eliminad@' });
    });
};

Tipoobra.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipoobra;
