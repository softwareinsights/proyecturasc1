const router = require('express').Router();
const Detallenotagasto = require('../models/detallenotagasto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallenotagasto.all(created_by, (error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallenotagasto.count((error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallenotagasto.exist(req.params.id, (error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallenotagasto.findById(req.params.id, created_by, (error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallenotagasto.logicRemove(req.params.id, created_by, (error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _detallenotagasto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallenotagasto.update(_detallenotagasto, created_by, (error, data) => {
                        return Detallenotagasto.response(res, error, data);
                    })
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallenotagasto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _detallenotagasto = req.body;
                    _detallenotagasto.created_by = auth_data.user.idsi_user;
                    Detallenotagasto.insert( _detallenotagasto, (error, data) =>{
                        return Detallenotagasto.response(res, error, data);
                    });
                } else {
                    return Detallenotagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
