const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//定义模型 模型对应mongodb里面的集合，每一个属性对应数据库里面的key
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,//唯一ID
    userName: { unique: true, type: String },//用户名是唯一的  类型String
    tel: String,
    lev: String,
    position: String,
    age: String,
    password: String,
    vip: String,
    imgUrl: String,
    team: String,
    createDate: { type: Date, default: Date.now() }//创建时间
});

userSchema.pre('save',function(next){
    //随机生成salt  10代表迭代次数
    bcrypt.genSalt(10,(err,salt) =>{
        if(err) return next(err);
        bcrypt.hash(this.password,salt,(err,hash) =>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
})

userSchema.methods = {
    comparePassword:(_password, password) =>{
        return new Promise((resolve,reject) =>{
            bcrypt.compare(_password, password, (err, isMatch) => {
                // console.log(_password, password);
                if (!err) resolve(isMatch);
                else reject(err);
            })
        })
    } 
}


// 发布模型
mongoose.model('User', userSchema);