const router = require('express').Router();
const Categoria = require('../models/categoria');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Categoria.all(created_by, (error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Categoria.count((error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Categoria.exist(req.params.id, (error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Categoria.findById(req.params.id, created_by, (error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Categoria.logicRemove(req.params.id, created_by, (error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _categoria = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Categoria.update(_categoria, created_by, (error, data) => {
                        return Categoria.response(res, error, data);
                    })
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'categoria', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _categoria = req.body;
                    _categoria.created_by = auth_data.user.idsi_user;
                    Categoria.insert( _categoria, (error, data) =>{
                        return Categoria.response(res, error, data);
                    });
                } else {
                    return Categoria.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
