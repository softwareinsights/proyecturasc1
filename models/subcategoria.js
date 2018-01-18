const connection = require('../config/db-connection');

const Subcategoria = {};

Subcategoria.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT subcategoria.* FROM subcategoria    WHERE created_by = ? HAVING subcategoria.baja IS NULL OR subcategoria.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT subcategoria.* FROM subcategoria    HAVING subcategoria.baja IS NULL OR subcategoria.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria leíd@' });
    });
};

Subcategoria.findById = (idSubcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM subcategoria WHERE idsubcategoria = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSubcategoria, created_by];
    } else {
        query = 'SELECT * FROM subcategoria WHERE idsubcategoria = ? HAVING baja IS NULL OR baja = false';
        keys = [idSubcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria encontrad@' });
    });
};

Subcategoria.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsubcategoria) AS count FROM subcategoria';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria contabilizad@' });
    });
};

Subcategoria.exist = (idSubcategoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM subcategoria WHERE idsubcategoria = ?) AS exist';
    keys = [idSubcategoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria verificad@' });
    });
};

Subcategoria.insert = (Subcategoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO subcategoria SET ?';
    keys = [Subcategoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria cread@' });
    });
};

Subcategoria.update = (Subcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE subcategoria SET ? WHERE idsubcategoria = ? AND created_by = ?';
        keys = [Subcategoria, Subcategoria.idsubcategoria, created_by];
    } else {
        query = 'UPDATE subcategoria SET ? WHERE idsubcategoria = ?';
        keys = [Subcategoria, Subcategoria.idsubcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria actualizad@' });
    });
};

Subcategoria.remove = (idsubcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM subcategoria WHERE idsubcategoria = ? AND created_by = ?';
        keys = [idsubcategoria, created_by];
    } else {
        query = 'DELETE FROM subcategoria WHERE idsubcategoria = ?';
        keys = [idsubcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria eliminad@' });
    });
};

Subcategoria.logicRemove = (idsubcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE subcategoria SET baja = 1 WHERE idsubcategoria = ? AND created_by = ?';
        keys = [idsubcategoria, created_by];
    } else {
        query = 'UPDATE subcategoria SET baja = 1 WHERE idsubcategoria = ?';
        keys = [idsubcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Subcategoria eliminad@' });
    });
};

Subcategoria.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Subcategoria;
