const connection = require('../config/db-connection');

const Statususuario = {};

Statususuario.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT statususuario.* FROM statususuario    WHERE created_by = ? HAVING statususuario.baja IS NULL OR statususuario.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT statususuario.* FROM statususuario    HAVING statususuario.baja IS NULL OR statususuario.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario leíd@' });
    });
};

Statususuario.findById = (idStatususuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM statususuario WHERE idstatususuario = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idStatususuario, created_by];
    } else {
        query = 'SELECT * FROM statususuario WHERE idstatususuario = ? HAVING baja IS NULL OR baja = false';
        keys = [idStatususuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario encontrad@' });
    });
};

Statususuario.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idstatususuario) AS count FROM statususuario';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario contabilizad@' });
    });
};

Statususuario.exist = (idStatususuario, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM statususuario WHERE idstatususuario = ?) AS exist';
    keys = [idStatususuario];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario verificad@' });
    });
};

Statususuario.insert = (Statususuario, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO statususuario SET ?';
    keys = [Statususuario];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario cread@' });
    });
};

Statususuario.update = (Statususuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE statususuario SET ? WHERE idstatususuario = ? AND created_by = ?';
        keys = [Statususuario, Statususuario.idstatususuario, created_by];
    } else {
        query = 'UPDATE statususuario SET ? WHERE idstatususuario = ?';
        keys = [Statususuario, Statususuario.idstatususuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario actualizad@' });
    });
};

Statususuario.remove = (idstatususuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM statususuario WHERE idstatususuario = ? AND created_by = ?';
        keys = [idstatususuario, created_by];
    } else {
        query = 'DELETE FROM statususuario WHERE idstatususuario = ?';
        keys = [idstatususuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario eliminad@' });
    });
};

Statususuario.logicRemove = (idstatususuario, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE statususuario SET baja = 1 WHERE idstatususuario = ? AND created_by = ?';
        keys = [idstatususuario, created_by];
    } else {
        query = 'UPDATE statususuario SET baja = 1 WHERE idstatususuario = ?';
        keys = [idstatususuario];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Statususuario eliminad@' });
    });
};

Statususuario.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Statususuario;
