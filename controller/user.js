const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');


router.post('/registUser', async (ctx) => { //这个/registUser和前端的要匹配
    // 获取model（因为我要操作数据库，所以要加载model）
    const User = mongoose.model('User');
    // 接收post请求封装成user对象
    let newUser = new User(ctx.request.body);
    console.log(ctx.request.body);
    // 使用save保存用户信息
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        };
    });
    console.log("连接成功");
});

router.post("/loginUser",async ctx =>{
    // 接收前端发送的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    // 引入model
    const User = mongoose.model('User');
    //先看用户名是否成功  若成功了在比较密码
    await User.findOne({userName : userName}).exec().then( async (result) =>{
        if(result){
            //new出实例化比较密码的方法
            let newUser = new User();
             await newUser.comparePassword(password,result.password)
            .then(isMatch =>{
                //登陆成功
                if(isMatch){
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        userInfo: result,
                    };
                }
                else{
                    ctx.body = {
                        code: 201,
                        message: '登录失败'
                    };
                }
            })
        }
        else{//用户名不存在
            ctx.body = {
                code:201,
                message:"用户名不存在"
            }
        }
    })
})


module.exports = router;
