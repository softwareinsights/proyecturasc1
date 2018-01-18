const router = require('express').Router();
const Unidadmedida = require('../models/unidadmedida');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Unidadmedida.all(created_by, (error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Unidadmedida.count((error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Unidadmedida.exist(req.params.id, (error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Unidadmedida.findById(req.params.id, created_by, (error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Unidadmedida.logicRemove(req.params.id, created_by, (error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _unidadmedida = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Unidadmedida.update(_unidadmedida, created_by, (error, data) => {
                        return Unidadmedida.response(res, error, data);
                    })
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'unidadmedida', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _unidadmedida = req.body;
                    _unidadmedida.created_by = auth_data.user.idsi_user;
                    Unidadmedida.insert( _unidadmedida, (error, data) =>{
                        return Unidadmedida.response(res, error, data);
                    });
                } else {
                    return Unidadmedida.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
