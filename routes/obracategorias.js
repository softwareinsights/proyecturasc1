const router = require('express').Router();
const Obracategoria = require('../models/obracategoria');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obracategoria.all(created_by, (error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Obracategoria.count((error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Obracategoria.exist(req.params.id, (error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obracategoria.findById(req.params.id, created_by, (error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obracategoria.logicRemove(req.params.id, created_by, (error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _obracategoria = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obracategoria.update(_obracategoria, created_by, (error, data) => {
                        return Obracategoria.response(res, error, data);
                    })
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obracategoria', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _obracategoria = req.body;
                    _obracategoria.created_by = auth_data.user.idsi_user;
                    Obracategoria.insert( _obracategoria, (error, data) =>{
                        return Obracategoria.response(res, error, data);
                    });
                } else {
                    return Obracategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
