const router = require('express').Router();
const Razonsocial = require('../models/razonsocial');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Razonsocial.all(created_by, (error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Razonsocial.count((error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Razonsocial.exist(req.params.id, (error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Razonsocial.findById(req.params.id, created_by, (error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Razonsocial.logicRemove(req.params.id, created_by, (error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _razonsocial = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Razonsocial.update(_razonsocial, created_by, (error, data) => {
                        return Razonsocial.response(res, error, data);
                    })
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'razonsocial', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _razonsocial = req.body;
                    _razonsocial.created_by = auth_data.user.idsi_user;
                    Razonsocial.insert( _razonsocial, (error, data) =>{
                        return Razonsocial.response(res, error, data);
                    });
                } else {
                    return Razonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
