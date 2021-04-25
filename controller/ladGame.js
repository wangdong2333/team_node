const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/getGameList', async ctx =>{
    const LadGameList = mongoose.model('LadGameList');
    await LadGameList.find({}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getDetail',async ctx =>{
    const LadGameList = mongoose.model('LadGameList');
    await LadGameList.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateGameList',async ctx =>{
    const LadGameList = mongoose.model('LadGameList');
    console.log(ctx.query.id, ctx.request.body);
    await LadGameList.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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
    const LadGameList = mongoose.model('LadGameList');
    await LadGameList.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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
    const LadGameList = mongoose.model('LadGameList');
    // 接收post请求封装成对象
    let newMember = new LadGameList(ctx.request.body);
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
    const LadGameList = mongoose.model('LadGameList');
    await LadGameList.find({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
