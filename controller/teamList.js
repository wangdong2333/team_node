const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/insertTeamList',async ctx =>{
    fs.readFile('./data/teamList.json','utf8',(err,data) =>{
        data = JSON.parse(data);
        let count = 0;
        const TeamList = mongoose.model('TeamList');
        data.map((value,index) =>{
            let teamList = new TeamList(value);
            teamList.save().then(() =>{
                count++;
                console.log("成功"+count);
            }).catch((err) =>{
                console.log("失败"+err);
            })
        })
    })
    ctx.body = "导入成员数据";
})

router.get('/getTeamList',async ctx =>{
    const TeamList = mongoose.model('TeamList');
    await TeamList.find({}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getDetail',async ctx =>{
    const TeamList = mongoose.model('TeamList');
    await TeamList.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateTeamList',async ctx =>{
    const TeamList = mongoose.model('TeamList');
    console.log(ctx.query.id, ctx.request.body);
    await TeamList.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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
    const TeamList = mongoose.model('TeamList');
    await TeamList.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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
    const TeamList = mongoose.model('TeamList');
    // 接收post请求封装成对象
    let newMember = new TeamList(ctx.request.body);
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
    const TeamList = mongoose.model('TeamList');
    await TeamList.find({name:ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
