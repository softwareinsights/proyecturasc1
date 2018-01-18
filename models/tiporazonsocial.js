const connection = require('../config/db-connection');

const Tiporazonsocial = {};

Tiporazonsocial.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tiporazonsocial.* FROM tiporazonsocial    WHERE created_by = ? HAVING tiporazonsocial.baja IS NULL OR tiporazonsocial.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tiporazonsocial.* FROM tiporazonsocial    HAVING tiporazonsocial.baja IS NULL OR tiporazonsocial.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial leíd@' });
    });
};

Tiporazonsocial.findById = (idTiporazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tiporazonsocial WHERE idtiporazonsocial = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTiporazonsocial, created_by];
    } else {
        query = 'SELECT * FROM tiporazonsocial WHERE idtiporazonsocial = ? HAVING baja IS NULL OR baja = false';
        keys = [idTiporazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial encontrad@' });
    });
};

Tiporazonsocial.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtiporazonsocial) AS count FROM tiporazonsocial';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial contabilizad@' });
    });
};

Tiporazonsocial.exist = (idTiporazonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tiporazonsocial WHERE idtiporazonsocial = ?) AS exist';
    keys = [idTiporazonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial verificad@' });
    });
};

Tiporazonsocial.insert = (Tiporazonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tiporazonsocial SET ?';
    keys = [Tiporazonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial cread@' });
    });
};

Tiporazonsocial.update = (Tiporazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tiporazonsocial SET ? WHERE idtiporazonsocial = ? AND created_by = ?';
        keys = [Tiporazonsocial, Tiporazonsocial.idtiporazonsocial, created_by];
    } else {
        query = 'UPDATE tiporazonsocial SET ? WHERE idtiporazonsocial = ?';
        keys = [Tiporazonsocial, Tiporazonsocial.idtiporazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial actualizad@' });
    });
};

Tiporazonsocial.remove = (idtiporazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tiporazonsocial WHERE idtiporazonsocial = ? AND created_by = ?';
        keys = [idtiporazonsocial, created_by];
    } else {
        query = 'DELETE FROM tiporazonsocial WHERE idtiporazonsocial = ?';
        keys = [idtiporazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial eliminad@' });
    });
};

Tiporazonsocial.logicRemove = (idtiporazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tiporazonsocial SET baja = 1 WHERE idtiporazonsocial = ? AND created_by = ?';
        keys = [idtiporazonsocial, created_by];
    } else {
        query = 'UPDATE tiporazonsocial SET baja = 1 WHERE idtiporazonsocial = ?';
        keys = [idtiporazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tiporazonsocial eliminad@' });
    });
};

Tiporazonsocial.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tiporazonsocial;
