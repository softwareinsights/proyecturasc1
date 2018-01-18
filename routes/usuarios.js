const router = require('express').Router();
const Usuario = require('../models/usuario');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Usuario.all(created_by, (error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Usuario.count((error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Usuario.exist(req.params.id, (error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Usuario.findById(req.params.id, created_by, (error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Usuario.logicRemove(req.params.id, created_by, (error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _usuario = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Usuario.update(_usuario, created_by, (error, data) => {
                        return Usuario.response(res, error, data);
                    })
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'usuario', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _usuario = req.body;
                    _usuario.created_by = auth_data.user.idsi_user;
                    Usuario.insert( _usuario, (error, data) =>{
                        return Usuario.response(res, error, data);
                    });
                } else {
                    return Usuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
