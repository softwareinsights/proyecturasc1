const connection = require('../config/db-connection');

const Presupuesto = {};

Presupuesto.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT presupuesto.*, _idobra. as obra_idobra , _idcategoria. as categoria_idcategoria FROM presupuesto INNER JOIN obra as _idobra ON _idobra.idobra = presupuesto.idobra INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = presupuesto.idcategoria   WHERE created_by = ? HAVING presupuesto.baja IS NULL OR presupuesto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT presupuesto.*, _idobra. as obra_idobra , _idcategoria. as categoria_idcategoria FROM presupuesto INNER JOIN obra as _idobra ON _idobra.idobra = presupuesto.idobra INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = presupuesto.idcategoria   HAVING presupuesto.baja IS NULL OR presupuesto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto leíd@' });
    });
};

Presupuesto.findById = (idPresupuesto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM presupuesto WHERE idpresupuesto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPresupuesto, created_by];
    } else {
        query = 'SELECT * FROM presupuesto WHERE idpresupuesto = ? HAVING baja IS NULL OR baja = false';
        keys = [idPresupuesto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto encontrad@' });
    });
};

Presupuesto.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpresupuesto) AS count FROM presupuesto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto contabilizad@' });
    });
};

Presupuesto.exist = (idPresupuesto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM presupuesto WHERE idpresupuesto = ?) AS exist';
    keys = [idPresupuesto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto verificad@' });
    });
};

Presupuesto.insert = (Presupuesto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO presupuesto SET ?';
    keys = [Presupuesto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto cread@' });
    });
};

Presupuesto.update = (Presupuesto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE presupuesto SET ? WHERE idpresupuesto = ? AND created_by = ?';
        keys = [Presupuesto, Presupuesto.idpresupuesto, created_by];
    } else {
        query = 'UPDATE presupuesto SET ? WHERE idpresupuesto = ?';
        keys = [Presupuesto, Presupuesto.idpresupuesto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto actualizad@' });
    });
};

Presupuesto.remove = (idpresupuesto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM presupuesto WHERE idpresupuesto = ? AND created_by = ?';
        keys = [idpresupuesto, created_by];
    } else {
        query = 'DELETE FROM presupuesto WHERE idpresupuesto = ?';
        keys = [idpresupuesto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto eliminad@' });
    });
};

Presupuesto.logicRemove = (idpresupuesto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE presupuesto SET baja = 1 WHERE idpresupuesto = ? AND created_by = ?';
        keys = [idpresupuesto, created_by];
    } else {
        query = 'UPDATE presupuesto SET baja = 1 WHERE idpresupuesto = ?';
        keys = [idpresupuesto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Presupuesto eliminad@' });
    });
};

Presupuesto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Presupuesto;
