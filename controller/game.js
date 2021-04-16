const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/insertGame',async ctx =>{
    fs.readFile('./data/game.json','utf8',(err,data) =>{
        data = JSON.parse(data);
        let count = 0;
        const GameList = mongoose.model('GameList');
        data.map((value,index) =>{
            let gameList = new GameList(value);
            gameList.save().then(() =>{
                count++;
                console.log("成功"+count);
            }).catch((err) =>{
                console.log("失败"+err);
            })
        })
    })
    ctx.body = "导入成员数据";
})

router.get('/getGameList', async ctx =>{
    const GameList = mongoose.model('GameList');
    await GameList.find({}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getDetail',async ctx =>{
    const GameList = mongoose.model('GameList');
    await GameList.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateGameList',async ctx =>{
    const GameList = mongoose.model('GameList');
    console.log(ctx.query.id, ctx.request.body);
    await GameList.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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
    const GameList = mongoose.model('GameList');
    await GameList.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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
    const GameList = mongoose.model('GameList');
    // 接收post请求封装成对象
    let newMember = new GameList(ctx.request.body);
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

module.exports = router;
