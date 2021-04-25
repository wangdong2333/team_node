const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');


router.get('/getV5Team',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    await V5Team.find({}).exec().then(res => {
        ctx.body = res;
    })
})


router.get('/getDetail',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    await V5Team.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})


router.get('/getNameDetail',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    await V5Team.findOne({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/upadateTeamList',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    console.log(ctx.query.id, ctx.request.body);
    await V5Team.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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

router.get('/delTeamList',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    await V5Team.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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

router.post('/addTeamList',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    // 接收post请求封装成对象
    let newMember = new V5Team(ctx.request.body);
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

router.get('/searchMember',async ctx =>{
    const V5Team = mongoose.model('V5Team');
    await V5Team.find({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
