const connection = require('../config/db-connection');

const Unidadmedida = {};

Unidadmedida.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT unidadmedida.* FROM unidadmedida    WHERE created_by = ? HAVING unidadmedida.baja IS NULL OR unidadmedida.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT unidadmedida.* FROM unidadmedida    HAVING unidadmedida.baja IS NULL OR unidadmedida.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida leíd@' });
    });
};

Unidadmedida.findById = (idUnidadmedida, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM unidadmedida WHERE idunidadmedida = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idUnidadmedida, created_by];
    } else {
        query = 'SELECT * FROM unidadmedida WHERE idunidadmedida = ? HAVING baja IS NULL OR baja = false';
        keys = [idUnidadmedida];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida encontrad@' });
    });
};

Unidadmedida.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idunidadmedida) AS count FROM unidadmedida';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida contabilizad@' });
    });
};

Unidadmedida.exist = (idUnidadmedida, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM unidadmedida WHERE idunidadmedida = ?) AS exist';
    keys = [idUnidadmedida];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida verificad@' });
    });
};

Unidadmedida.insert = (Unidadmedida, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO unidadmedida SET ?';
    keys = [Unidadmedida];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida cread@' });
    });
};

Unidadmedida.update = (Unidadmedida, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE unidadmedida SET ? WHERE idunidadmedida = ? AND created_by = ?';
        keys = [Unidadmedida, Unidadmedida.idunidadmedida, created_by];
    } else {
        query = 'UPDATE unidadmedida SET ? WHERE idunidadmedida = ?';
        keys = [Unidadmedida, Unidadmedida.idunidadmedida];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida actualizad@' });
    });
};

Unidadmedida.remove = (idunidadmedida, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM unidadmedida WHERE idunidadmedida = ? AND created_by = ?';
        keys = [idunidadmedida, created_by];
    } else {
        query = 'DELETE FROM unidadmedida WHERE idunidadmedida = ?';
        keys = [idunidadmedida];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida eliminad@' });
    });
};

Unidadmedida.logicRemove = (idunidadmedida, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE unidadmedida SET baja = 1 WHERE idunidadmedida = ? AND created_by = ?';
        keys = [idunidadmedida, created_by];
    } else {
        query = 'UPDATE unidadmedida SET baja = 1 WHERE idunidadmedida = ?';
        keys = [idunidadmedida];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Unidadmedida eliminad@' });
    });
};

Unidadmedida.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Unidadmedida;
