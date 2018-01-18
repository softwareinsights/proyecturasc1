const connection = require('../config/db-connection');

const Estatusobra = {};

Estatusobra.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estatusobra.* FROM estatusobra    WHERE created_by = ? HAVING estatusobra.baja IS NULL OR estatusobra.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estatusobra.* FROM estatusobra    HAVING estatusobra.baja IS NULL OR estatusobra.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra leíd@' });
    });
};

Estatusobra.findById = (idEstatusobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estatusobra WHERE idestatusobra = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstatusobra, created_by];
    } else {
        query = 'SELECT * FROM estatusobra WHERE idestatusobra = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstatusobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra encontrad@' });
    });
};

Estatusobra.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestatusobra) AS count FROM estatusobra';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra contabilizad@' });
    });
};

Estatusobra.exist = (idEstatusobra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estatusobra WHERE idestatusobra = ?) AS exist';
    keys = [idEstatusobra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra verificad@' });
    });
};

Estatusobra.insert = (Estatusobra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estatusobra SET ?';
    keys = [Estatusobra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra cread@' });
    });
};

Estatusobra.update = (Estatusobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estatusobra SET ? WHERE idestatusobra = ? AND created_by = ?';
        keys = [Estatusobra, Estatusobra.idestatusobra, created_by];
    } else {
        query = 'UPDATE estatusobra SET ? WHERE idestatusobra = ?';
        keys = [Estatusobra, Estatusobra.idestatusobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra actualizad@' });
    });
};

Estatusobra.remove = (idestatusobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estatusobra WHERE idestatusobra = ? AND created_by = ?';
        keys = [idestatusobra, created_by];
    } else {
        query = 'DELETE FROM estatusobra WHERE idestatusobra = ?';
        keys = [idestatusobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra eliminad@' });
    });
};

Estatusobra.logicRemove = (idestatusobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estatusobra SET baja = 1 WHERE idestatusobra = ? AND created_by = ?';
        keys = [idestatusobra, created_by];
    } else {
        query = 'UPDATE estatusobra SET baja = 1 WHERE idestatusobra = ?';
        keys = [idestatusobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatusobra eliminad@' });
    });
};

Estatusobra.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estatusobra;
