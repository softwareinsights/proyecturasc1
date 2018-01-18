const router = require('express').Router();
const Estatusobra = require('../models/estatusobra');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatusobra.all(created_by, (error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estatusobra.count((error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estatusobra.exist(req.params.id, (error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatusobra.findById(req.params.id, created_by, (error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatusobra.logicRemove(req.params.id, created_by, (error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estatusobra = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estatusobra.update(_estatusobra, created_by, (error, data) => {
                        return Estatusobra.response(res, error, data);
                    })
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'estatusobra', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estatusobra = req.body;
                    _estatusobra.created_by = auth_data.user.idsi_user;
                    Estatusobra.insert( _estatusobra, (error, data) =>{
                        return Estatusobra.response(res, error, data);
                    });
                } else {
                    return Estatusobra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
