const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/getGameList', async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    await V5GameList.find({}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getDetail',async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    await V5GameList.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateGameList',async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    console.log(ctx.query.id, ctx.request.body);
    await V5GameList.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
        ctx.body = {
            code: 200,
            message: '修改成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        };
    });
})

router.get('/delGameList',async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    await V5GameList.findByIdAndRemove({_id:ctx.query.id}).then(res => {
        ctx.body = {
            code: 200,
            message: '删除成功'
        };
    }).catch((err) =>{
        ctx.body = {
            code: 500,
            message: err
        };
    })
})

router.post('/addGameList',async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    // 接收post请求封装成对象
    let newMember = new V5GameList(ctx.request.body);
    console.log(ctx.request.body);
    await newMember.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        };
    });
})

router.get('/searchGame',async ctx =>{
    const V5GameList = mongoose.model('V5GameList');
    await V5GameList.find({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
