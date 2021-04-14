const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/insertTransferList',async ctx =>{
    fs.readFile('./data/transfer.json','utf8',(err,data) =>{
        data = JSON.parse(data);
        let count = 0;
        const TransferList = mongoose.model('TransferList');
        data.map((value,index) =>{
            let transferList = new TransferList(value);
            transferList.save().then(() =>{
                count++;
                console.log("成功" + count);
            }).catch((err) =>{
                console.log("失败" + err);
            })
        })
    })
    ctx.body = "导入成员数据";
})

router.get('/getTransferList',async ctx =>{
    const TransferList = mongoose.model('TransferList');
    await TransferList.find({}).exec().then(res => {
        ctx.body = res;
    })
})

router.get('/getDetail',async ctx =>{
    const TransferList = mongoose.model('TransferList');
    await TransferList.findOne({_id:ctx.query.id}).exec().then(res => {
        ctx.body = res;
    })
})

router.post('/updateTransferList',async ctx =>{
    const TransferList = mongoose.model('TransferList');
    console.log(ctx.query.id, ctx.request.body);
    await TransferList.updateOne({_id:ctx.query.id}, ctx.request.body).then(res => {
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

router.get('/delTransferList',async ctx =>{
    const TransferList = mongoose.model('TransferList');
    await TransferList.findByIdAndRemove({_id:ctx.query.id}).then(res => {
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

router.post('/addTransferList',async ctx =>{
    const TransferList = mongoose.model('TransferList');
    // 接收post请求封装成对象
    let newMember = new TransferList(ctx.request.body);
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
