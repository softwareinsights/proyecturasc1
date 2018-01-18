const connection = require('../config/db-connection');

const Obracategoria = {};

Obracategoria.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT obracategoria.*, _idobra. as obra_idobra , _idcategoria. as categoria_idcategoria FROM obracategoria INNER JOIN obra as _idobra ON _idobra.idobra = obracategoria.idobra INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = obracategoria.idcategoria   WHERE created_by = ? HAVING obracategoria.baja IS NULL OR obracategoria.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT obracategoria.*, _idobra. as obra_idobra , _idcategoria. as categoria_idcategoria FROM obracategoria INNER JOIN obra as _idobra ON _idobra.idobra = obracategoria.idobra INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = obracategoria.idcategoria   HAVING obracategoria.baja IS NULL OR obracategoria.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria leíd@' });
    });
};

Obracategoria.findById = (idObracategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM obracategoria WHERE idobracategoria = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idObracategoria, created_by];
    } else {
        query = 'SELECT * FROM obracategoria WHERE idobracategoria = ? HAVING baja IS NULL OR baja = false';
        keys = [idObracategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria encontrad@' });
    });
};

Obracategoria.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idobracategoria) AS count FROM obracategoria';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria contabilizad@' });
    });
};

Obracategoria.exist = (idObracategoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM obracategoria WHERE idobracategoria = ?) AS exist';
    keys = [idObracategoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria verificad@' });
    });
};

Obracategoria.insert = (Obracategoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO obracategoria SET ?';
    keys = [Obracategoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria cread@' });
    });
};

Obracategoria.update = (Obracategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE obracategoria SET ? WHERE idobracategoria = ? AND created_by = ?';
        keys = [Obracategoria, Obracategoria.idobracategoria, created_by];
    } else {
        query = 'UPDATE obracategoria SET ? WHERE idobracategoria = ?';
        keys = [Obracategoria, Obracategoria.idobracategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria actualizad@' });
    });
};

Obracategoria.remove = (idobracategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM obracategoria WHERE idobracategoria = ? AND created_by = ?';
        keys = [idobracategoria, created_by];
    } else {
        query = 'DELETE FROM obracategoria WHERE idobracategoria = ?';
        keys = [idobracategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria eliminad@' });
    });
};

Obracategoria.logicRemove = (idobracategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE obracategoria SET baja = 1 WHERE idobracategoria = ? AND created_by = ?';
        keys = [idobracategoria, created_by];
    } else {
        query = 'UPDATE obracategoria SET baja = 1 WHERE idobracategoria = ?';
        keys = [idobracategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obracategoria eliminad@' });
    });
};

Obracategoria.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Obracategoria;
