const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');


router.get('/getLgdTeam',async ctx =>{
    const LgdTeam = mongoose.model('LgdTeam');
    await LgdTeam.find({}).exec().then(res => {
        ctx.body = res;
    })
})



router.get('/getDetail',async ctx =>{
    const LgdTeam = mongoose.model('LgdTeam');
    await LgdTeam.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getNameDetail',async ctx =>{
    const LgdTeam = mongoose.model('LgdTeam');
    await LgdTeam.findOne({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateTeamList',async ctx =>{
    const LgdTeam = mongoose.model('LgdTeam');
    console.log(ctx.query.id, ctx.request.body);
    await LgdTeam.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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
    const LgdTeam = mongoose.model('LgdTeam');
    await LgdTeam.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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
    const LgdTeam = mongoose.model('LgdTeam');
    // 接收post请求封装成对象
    let newMember = new LgdTeam(ctx.request.body);
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
    const LgdTeam = mongoose.model('LgdTeam');
    await LgdTeam.find({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
