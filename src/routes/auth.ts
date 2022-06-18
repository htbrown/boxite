import express, { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import r from 'rethinkdb';
import Database from '../modules/database';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        let user = (await (await r.table('users').filter({ username }).run(Database.connection)).toArray())[0];
        if (!user) return done(null, false, { message: 'Incorrect username or password.' });
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false, { message: 'Incorrect username or password.' });
            done(null, user);
        })
    }
));

passport.serializeUser((user: any, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.id, username: user.username })
    })
});
passport.deserializeUser((user: any, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    })
});


export let router = express.Router();

router.route('/login')
    .get((req, res) => {
        res.render('login', { title: 'Login', layout: 'layouts/login' });
    })
    .post(passport.authenticate('local', {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true
    }));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
})