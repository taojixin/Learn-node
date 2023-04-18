const express = require('express')
const parser = require('body-parser')
const errorHandler = require('./error-handle')

// const useRouters = require('../router')
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const momentRouter = require('../router/moment.router')
const commentRouter = require('../router/comment.router')
const labelRouter = require('../router/label.router')

const app = new express();

// app.useRouters = useRouters;

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

app.use('/users', userRouter);
app.use('/', authRouter);
app.use('/', momentRouter);
app.use('/', commentRouter);
app.use('/', labelRouter)

// app.useRouters();
app.on('error', errorHandler)

module.exports = app;