const router = require('express').Router();
const Empresa = require('../models/empresa');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empresa.all(created_by, (error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empresa.count((error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empresa.exist(req.params.id, (error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empresa.findById(req.params.id, created_by, (error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empresa.logicRemove(req.params.id, created_by, (error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _empresa = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empresa.update(_empresa, created_by, (error, data) => {
                        return Empresa.response(res, error, data);
                    })
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'empresa', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _empresa = req.body;
                    _empresa.created_by = auth_data.user.idsi_user;
                    Empresa.insert( _empresa, (error, data) =>{
                        return Empresa.response(res, error, data);
                    });
                } else {
                    return Empresa.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
