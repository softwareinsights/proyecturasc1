const connection = require('../config/db-connection');

const Obra = {};

Obra.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT obra.*, _idtipoobra. as tipoobra_idtipoobra , _idestatusobra. as estatusobra_idestatusobra , _idrazonsocialconstructor. as razonsocial_idrazonsocialconstructor , _idrazonsocialcliente. as razonsocial_idrazonsocialcliente , _idrazonsocialcontratista. as razonsocial_idrazonsocialcontratista , _idrazonsocialasociado. as razonsocial_idrazonsocialasociado FROM obra INNER JOIN tipoobra as _idtipoobra ON _idtipoobra.idtipoobra = obra.idtipoobra INNER JOIN estatusobra as _idestatusobra ON _idestatusobra.idestatusobra = obra.idestatusobra INNER JOIN razonsocial as _idrazonsocialconstructor ON _idrazonsocialconstructor.idrazonsocial = obra.idrazonsocialconstructor INNER JOIN razonsocial as _idrazonsocialcliente ON _idrazonsocialcliente.idrazonsocial = obra.idrazonsocialcliente INNER JOIN razonsocial as _idrazonsocialcontratista ON _idrazonsocialcontratista.idrazonsocial = obra.idrazonsocialcontratista INNER JOIN razonsocial as _idrazonsocialasociado ON _idrazonsocialasociado.idrazonsocial = obra.idrazonsocialasociado   WHERE created_by = ? HAVING obra.baja IS NULL OR obra.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT obra.*, _idtipoobra. as tipoobra_idtipoobra , _idestatusobra. as estatusobra_idestatusobra , _idrazonsocialconstructor. as razonsocial_idrazonsocialconstructor , _idrazonsocialcliente. as razonsocial_idrazonsocialcliente , _idrazonsocialcontratista. as razonsocial_idrazonsocialcontratista , _idrazonsocialasociado. as razonsocial_idrazonsocialasociado FROM obra INNER JOIN tipoobra as _idtipoobra ON _idtipoobra.idtipoobra = obra.idtipoobra INNER JOIN estatusobra as _idestatusobra ON _idestatusobra.idestatusobra = obra.idestatusobra INNER JOIN razonsocial as _idrazonsocialconstructor ON _idrazonsocialconstructor.idrazonsocial = obra.idrazonsocialconstructor INNER JOIN razonsocial as _idrazonsocialcliente ON _idrazonsocialcliente.idrazonsocial = obra.idrazonsocialcliente INNER JOIN razonsocial as _idrazonsocialcontratista ON _idrazonsocialcontratista.idrazonsocial = obra.idrazonsocialcontratista INNER JOIN razonsocial as _idrazonsocialasociado ON _idrazonsocialasociado.idrazonsocial = obra.idrazonsocialasociado   HAVING obra.baja IS NULL OR obra.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obra leíd@' });
    });
};

Obra.findById = (idObra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM obra WHERE idobra = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idObra, created_by];
    } else {
        query = 'SELECT * FROM obra WHERE idobra = ? HAVING baja IS NULL OR baja = false';
        keys = [idObra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obra encontrad@' });
    });
};

Obra.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idobra) AS count FROM obra';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Obra contabilizad@' });
    });
};

Obra.exist = (idObra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM obra WHERE idobra = ?) AS exist';
    keys = [idObra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Obra verificad@' });
    });
};

Obra.insert = (Obra, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO obra SET ?';
    keys = [Obra];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Obra cread@' });
    });
};

Obra.update = (Obra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE obra SET ? WHERE idobra = ? AND created_by = ?';
        keys = [Obra, Obra.idobra, created_by];
    } else {
        query = 'UPDATE obra SET ? WHERE idobra = ?';
        keys = [Obra, Obra.idobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obra actualizad@' });
    });
};

Obra.remove = (idobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM obra WHERE idobra = ? AND created_by = ?';
        keys = [idobra, created_by];
    } else {
        query = 'DELETE FROM obra WHERE idobra = ?';
        keys = [idobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obra eliminad@' });
    });
};

Obra.logicRemove = (idobra, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE obra SET baja = 1 WHERE idobra = ? AND created_by = ?';
        keys = [idobra, created_by];
    } else {
        query = 'UPDATE obra SET baja = 1 WHERE idobra = ?';
        keys = [idobra];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Obra eliminad@' });
    });
};

Obra.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Obra;
