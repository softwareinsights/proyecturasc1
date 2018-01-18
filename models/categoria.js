const connection = require('../config/db-connection');

const Categoria = {};

Categoria.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT categoria.* FROM categoria    WHERE created_by = ? HAVING categoria.baja IS NULL OR categoria.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT categoria.* FROM categoria    HAVING categoria.baja IS NULL OR categoria.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Categoria leíd@' });
    });
};

Categoria.findById = (idCategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM categoria WHERE idcategoria = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCategoria, created_by];
    } else {
        query = 'SELECT * FROM categoria WHERE idcategoria = ? HAVING baja IS NULL OR baja = false';
        keys = [idCategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Categoria encontrad@' });
    });
};

Categoria.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcategoria) AS count FROM categoria';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Categoria contabilizad@' });
    });
};

Categoria.exist = (idCategoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM categoria WHERE idcategoria = ?) AS exist';
    keys = [idCategoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Categoria verificad@' });
    });
};

Categoria.insert = (Categoria, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO categoria SET ?';
    keys = [Categoria];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Categoria cread@' });
    });
};

Categoria.update = (Categoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE categoria SET ? WHERE idcategoria = ? AND created_by = ?';
        keys = [Categoria, Categoria.idcategoria, created_by];
    } else {
        query = 'UPDATE categoria SET ? WHERE idcategoria = ?';
        keys = [Categoria, Categoria.idcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Categoria actualizad@' });
    });
};

Categoria.remove = (idcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM categoria WHERE idcategoria = ? AND created_by = ?';
        keys = [idcategoria, created_by];
    } else {
        query = 'DELETE FROM categoria WHERE idcategoria = ?';
        keys = [idcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Categoria eliminad@' });
    });
};

Categoria.logicRemove = (idcategoria, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE categoria SET baja = 1 WHERE idcategoria = ? AND created_by = ?';
        keys = [idcategoria, created_by];
    } else {
        query = 'UPDATE categoria SET baja = 1 WHERE idcategoria = ?';
        keys = [idcategoria];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Categoria eliminad@' });
    });
};

Categoria.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Categoria;
