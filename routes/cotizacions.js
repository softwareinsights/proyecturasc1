const router = require('express').Router();
const Cotizacion = require('../models/cotizacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cotizacion.all(created_by, (error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Cotizacion.count((error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Cotizacion.exist(req.params.id, (error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cotizacion.findById(req.params.id, created_by, (error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cotizacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _cotizacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cotizacion.update(_cotizacion, created_by, (error, data) => {
                        return Cotizacion.response(res, error, data);
                    })
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'cotizacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _cotizacion = req.body;
                    _cotizacion.created_by = auth_data.user.idsi_user;
                    Cotizacion.insert( _cotizacion, (error, data) =>{
                        return Cotizacion.response(res, error, data);
                    });
                } else {
                    return Cotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
