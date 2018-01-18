const router = require('express').Router();
const Subcategoria = require('../models/subcategoria');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Subcategoria.all(created_by, (error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Subcategoria.count((error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Subcategoria.exist(req.params.id, (error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Subcategoria.findById(req.params.id, created_by, (error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Subcategoria.logicRemove(req.params.id, created_by, (error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _subcategoria = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Subcategoria.update(_subcategoria, created_by, (error, data) => {
                        return Subcategoria.response(res, error, data);
                    })
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'subcategoria', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _subcategoria = req.body;
                    _subcategoria.created_by = auth_data.user.idsi_user;
                    Subcategoria.insert( _subcategoria, (error, data) =>{
                        return Subcategoria.response(res, error, data);
                    });
                } else {
                    return Subcategoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
