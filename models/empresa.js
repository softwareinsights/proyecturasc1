const connection = require('../config/db-connection');

const Empresa = {};

Empresa.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empresa.* FROM empresa    WHERE created_by = ? HAVING empresa.baja IS NULL OR empresa.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT empresa.* FROM empresa    HAVING empresa.baja IS NULL OR empresa.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empresa leíd@' });
    });
};

Empresa.findById = (idEmpresa, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM empresa WHERE idempresa = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpresa, created_by];
    } else {
        query = 'SELECT * FROM empresa WHERE idempresa = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpresa];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empresa encontrad@' });
    });
};

Empresa.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idempresa) AS count FROM empresa';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empresa contabilizad@' });
    });
};

Empresa.exist = (idEmpresa, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM empresa WHERE idempresa = ?) AS exist';
    keys = [idEmpresa];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empresa verificad@' });
    });
};

Empresa.insert = (Empresa, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO empresa SET ?';
    keys = [Empresa];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Empresa cread@' });
    });
};

Empresa.update = (Empresa, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empresa SET ? WHERE idempresa = ? AND created_by = ?';
        keys = [Empresa, Empresa.idempresa, created_by];
    } else {
        query = 'UPDATE empresa SET ? WHERE idempresa = ?';
        keys = [Empresa, Empresa.idempresa];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empresa actualizad@' });
    });
};

Empresa.remove = (idempresa, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM empresa WHERE idempresa = ? AND created_by = ?';
        keys = [idempresa, created_by];
    } else {
        query = 'DELETE FROM empresa WHERE idempresa = ?';
        keys = [idempresa];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empresa eliminad@' });
    });
};

Empresa.logicRemove = (idempresa, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empresa SET baja = 1 WHERE idempresa = ? AND created_by = ?';
        keys = [idempresa, created_by];
    } else {
        query = 'UPDATE empresa SET baja = 1 WHERE idempresa = ?';
        keys = [idempresa];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empresa eliminad@' });
    });
};

Empresa.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Empresa;
