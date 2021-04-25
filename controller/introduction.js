const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');

router.get('/insertIntroduction',async ctx =>{
    fs.readFile('./data/introduction.json','utf8',(err,data) =>{
        data = JSON.parse(data);
        let count = 0;
        const IntroductionList = mongoose.model('IntroductionList');
        data.map((value,index) =>{
            let introductionList = new IntroductionList(value);
            introductionList.save().then(() =>{
                count++;
                console.log("成功" + count);
            }).catch((err) =>{
                console.log("失败" + err);
            })
        })
    })
    ctx.body = "导入成员数据";
})

router.get('/getDetail',async ctx =>{
    const IntroductionList = mongoose.model('IntroductionList');
    await IntroductionList.findOne({name : ctx.query.name}).exec().then(res => {
        ctx.body = res;
    })
})

module.exports = router;
