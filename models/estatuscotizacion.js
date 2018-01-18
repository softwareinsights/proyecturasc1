const connection = require('../config/db-connection');

const Estatuscotizacion = {};

Estatuscotizacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estatuscotizacion.* FROM estatuscotizacion    WHERE created_by = ? HAVING estatuscotizacion.baja IS NULL OR estatuscotizacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estatuscotizacion.* FROM estatuscotizacion    HAVING estatuscotizacion.baja IS NULL OR estatuscotizacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion leíd@' });
    });
};

Estatuscotizacion.findById = (idEstatuscotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estatuscotizacion WHERE idestatuscotizacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstatuscotizacion, created_by];
    } else {
        query = 'SELECT * FROM estatuscotizacion WHERE idestatuscotizacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstatuscotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion encontrad@' });
    });
};

Estatuscotizacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestatuscotizacion) AS count FROM estatuscotizacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion contabilizad@' });
    });
};

Estatuscotizacion.exist = (idEstatuscotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estatuscotizacion WHERE idestatuscotizacion = ?) AS exist';
    keys = [idEstatuscotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion verificad@' });
    });
};

Estatuscotizacion.insert = (Estatuscotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estatuscotizacion SET ?';
    keys = [Estatuscotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion cread@' });
    });
};

Estatuscotizacion.update = (Estatuscotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estatuscotizacion SET ? WHERE idestatuscotizacion = ? AND created_by = ?';
        keys = [Estatuscotizacion, Estatuscotizacion.idestatuscotizacion, created_by];
    } else {
        query = 'UPDATE estatuscotizacion SET ? WHERE idestatuscotizacion = ?';
        keys = [Estatuscotizacion, Estatuscotizacion.idestatuscotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion actualizad@' });
    });
};

Estatuscotizacion.remove = (idestatuscotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estatuscotizacion WHERE idestatuscotizacion = ? AND created_by = ?';
        keys = [idestatuscotizacion, created_by];
    } else {
        query = 'DELETE FROM estatuscotizacion WHERE idestatuscotizacion = ?';
        keys = [idestatuscotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion eliminad@' });
    });
};

Estatuscotizacion.logicRemove = (idestatuscotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estatuscotizacion SET baja = 1 WHERE idestatuscotizacion = ? AND created_by = ?';
        keys = [idestatuscotizacion, created_by];
    } else {
        query = 'UPDATE estatuscotizacion SET baja = 1 WHERE idestatuscotizacion = ?';
        keys = [idestatuscotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estatuscotizacion eliminad@' });
    });
};

Estatuscotizacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estatuscotizacion;
