const connection = require('../config/db-connection');

const Statusrazonsocial = {};

Statusrazonsocial.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT statusrazonsocial.* FROM statusrazonsocial    WHERE created_by = ? HAVING statusrazonsocial.baja IS NULL OR statusrazonsocial.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT statusrazonsocial.* FROM statusrazonsocial    HAVING statusrazonsocial.baja IS NULL OR statusrazonsocial.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial leíd@' });
    });
};

Statusrazonsocial.findById = (idStatusrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM statusrazonsocial WHERE idstatusrazonsocial = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idStatusrazonsocial, created_by];
    } else {
        query = 'SELECT * FROM statusrazonsocial WHERE idstatusrazonsocial = ? HAVING baja IS NULL OR baja = false';
        keys = [idStatusrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial encontrad@' });
    });
};

Statusrazonsocial.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idstatusrazonsocial) AS count FROM statusrazonsocial';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial contabilizad@' });
    });
};

Statusrazonsocial.exist = (idStatusrazonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM statusrazonsocial WHERE idstatusrazonsocial = ?) AS exist';
    keys = [idStatusrazonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial verificad@' });
    });
};

Statusrazonsocial.insert = (Statusrazonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO statusrazonsocial SET ?';
    keys = [Statusrazonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial cread@' });
    });
};

Statusrazonsocial.update = (Statusrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE statusrazonsocial SET ? WHERE idstatusrazonsocial = ? AND created_by = ?';
        keys = [Statusrazonsocial, Statusrazonsocial.idstatusrazonsocial, created_by];
    } else {
        query = 'UPDATE statusrazonsocial SET ? WHERE idstatusrazonsocial = ?';
        keys = [Statusrazonsocial, Statusrazonsocial.idstatusrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial actualizad@' });
    });
};

Statusrazonsocial.remove = (idstatusrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM statusrazonsocial WHERE idstatusrazonsocial = ? AND created_by = ?';
        keys = [idstatusrazonsocial, created_by];
    } else {
        query = 'DELETE FROM statusrazonsocial WHERE idstatusrazonsocial = ?';
        keys = [idstatusrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial eliminad@' });
    });
};

Statusrazonsocial.logicRemove = (idstatusrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE statusrazonsocial SET baja = 1 WHERE idstatusrazonsocial = ? AND created_by = ?';
        keys = [idstatusrazonsocial, created_by];
    } else {
        query = 'UPDATE statusrazonsocial SET baja = 1 WHERE idstatusrazonsocial = ?';
        keys = [idstatusrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statusrazonsocial eliminad@' });
    });
};

Statusrazonsocial.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Statusrazonsocial;
