const router = require('express').Router();
const Statususuario = require('../models/statususuario');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statususuario.all(created_by, (error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Statususuario.count((error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Statususuario.exist(req.params.id, (error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statususuario.findById(req.params.id, created_by, (error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statususuario.logicRemove(req.params.id, created_by, (error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _statususuario = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Statususuario.update(_statususuario, created_by, (error, data) => {
                        return Statususuario.response(res, error, data);
                    })
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'statususuario', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _statususuario = req.body;
                    _statususuario.created_by = auth_data.user.idsi_user;
                    Statususuario.insert( _statususuario, (error, data) =>{
                        return Statususuario.response(res, error, data);
                    });
                } else {
                    return Statususuario.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
