const router = require('express').Router();
const Estatuscotizacion = require('../models/estatuscotizacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatuscotizacion.all(created_by, (error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estatuscotizacion.count((error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estatuscotizacion.exist(req.params.id, (error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatuscotizacion.findById(req.params.id, created_by, (error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatuscotizacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estatuscotizacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatuscotizacion.update(_estatuscotizacion, created_by, (error, data) => {
                        return Estatuscotizacion.response(res, error, data);
                    })
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatuscotizacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estatuscotizacion = req.body;
                    _estatuscotizacion.created_by = auth_data.user.idsi_user;
                    Estatuscotizacion.insert( _estatuscotizacion, (error, data) =>{
                        return Estatuscotizacion.response(res, error, data);
                    });
                } else {
                    return Estatuscotizacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
