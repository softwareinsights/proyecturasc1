const router = require('express').Router();
const Detallecotizacion = require('../models/detallecotizacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallecotizacion.all(created_by, (error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallecotizacion.count((error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallecotizacion.exist(req.params.id, (error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallecotizacion.findById(req.params.id, created_by, (error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallecotizacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _detallecotizacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallecotizacion.update(_detallecotizacion, created_by, (error, data) => {
                        return Detallecotizacion.response(res, error, data);
                    })
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallecotizacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _detallecotizacion = req.body;
                    _detallecotizacion.created_by = auth_data.user.idsi_user;
                    Detallecotizacion.insert( _detallecotizacion, (error, data) =>{
                        return Detallecotizacion.response(res, error, data);
                    });
                } else {
                    return Detallecotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
