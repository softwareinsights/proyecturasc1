const router = require('express').Router();
const Tipoobra = require('../models/tipoobra');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoobra.all(created_by, (error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipoobra.count((error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipoobra.exist(req.params.id, (error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoobra.findById(req.params.id, created_by, (error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoobra.logicRemove(req.params.id, created_by, (error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _tipoobra = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoobra.update(_tipoobra, created_by, (error, data) => {
                        return Tipoobra.response(res, error, data);
                    })
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipoobra', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _tipoobra = req.body;
                    _tipoobra.created_by = auth_data.user.idsi_user;
                    Tipoobra.insert( _tipoobra, (error, data) =>{
                        return Tipoobra.response(res, error, data);
                    });
                } else {
                    return Tipoobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
