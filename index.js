const Koa = require('koa');
const app = new Koa();

// 解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}));

// 接收前端post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 加载路由（不是随便在controller下建一个文件它就是控制器的，需要加载路由）
const Router = require('koa-router');
let user = require('./controller/user.js');
let teamList = require('./controller/teamList.js');
let transfer = require('./controller/transfer.js');
let game = require('./controller/game.js');
let introduction = require('./controller/introduction.js');
let ladTeam = require('./controller/ladTeam.js');
let v5Team = require('./controller/v5Team.js');
let ladGame = require('./controller/ladGame.js');
let v5Game = require('./controller/v5Game.js');







let router = new Router();
router.use('/user', user.routes());//这个/user的名字必须和前端的匹配
router.use('/teamList', teamList.routes());
router.use('/transfer', transfer.routes());
router.use('/game',game.routes());
router.use('/introduction',introduction.routes());
router.use('/ladTeam', ladTeam.routes());
router.use('/v5Team', v5Team.routes());
router.use('/ladGame', ladGame.routes());
router.use('/v5Game', v5Game.routes());







app.use(router.routes());
app.use(router.allowedMethods());//方法的目的是如果前端是get这面接收必须是get 如果是post，这面必须是post


const { connect, initSchemas } = require('./init.js');
(async () => {
    await connect();
    initSchemas();
})();

app.use(async (ctx) => {
    ctx.body = 'hello';
})

app.listen(3000, () => {
    console.log('start team server');
});