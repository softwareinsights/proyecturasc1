const router = require('express').Router();
const Statusrazonsocial = require('../models/statusrazonsocial');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statusrazonsocial.all(created_by, (error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Statusrazonsocial.count((error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Statusrazonsocial.exist(req.params.id, (error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statusrazonsocial.findById(req.params.id, created_by, (error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statusrazonsocial.logicRemove(req.params.id, created_by, (error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _statusrazonsocial = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statusrazonsocial.update(_statusrazonsocial, created_by, (error, data) => {
                        return Statusrazonsocial.response(res, error, data);
                    })
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statusrazonsocial', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _statusrazonsocial = req.body;
                    _statusrazonsocial.created_by = auth_data.user.idsi_user;
                    Statusrazonsocial.insert( _statusrazonsocial, (error, data) =>{
                        return Statusrazonsocial.response(res, error, data);
                    });
                } else {
                    return Statusrazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
