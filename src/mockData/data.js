const articles = [
  {
    "id": 1,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "嘻嘻",
    "create_time": '2018-09-23'
  },
  {
    "id": 2,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 3,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 4,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 5,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 6,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 7,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 8,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 9,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 10,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 11,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  },
  {
    "id": 12,
    "title": "前端适配：移动端/web适配方案",
    "reply": 20,
    "like": 255,
    "username": "牧羊",
    "create_time": '2018-09-23'
  }
];
const letter = [
  {
    "id": 1,
    "reply": '希望后期能添加更多的功能1',
    "create_time": '2018-09-23'
  },
  {
    "id": 2,
    "reply": '发布文章真的很简单',
    "create_time": '2018-09-23'
  },
  {
    "id": 3,
    "reply": '希望后期能添加更多的功能2',
    "create_time": '2018-09-23'
  },
  {
    "id": 4,
    "reply": '希望后期能添加更多的功能2',
    "create_time": '2018-09-23'
  },
  {
    "id": 5,
    "reply": '希望后期能添加更多的功能4',
    "create_time": '2018-09-23'
  },
  {
    "id": 6,
    "reply": '希望后期能添加更多的功能5',
    "create_time": '2018-09-23'
  },
  {
    "id": 7,
    "reply": '希望后期能添加更多的功能6',
    "create_time": '2018-09-23'
  },
  {
    "id": 8,
    "reply": '希望后期能添加更多的功能7',
    "create_time": '2018-09-23'
  },
  {
    "id": 9,
    "reply": '希望后期能添加更多的功能8',
    "create_time": '2018-09-23'
  },
  {
    "id": 10,
    "reply": '希望后期能添加更多的功能9',
    "create_time": '2018-09-23'
  },
  {
    "id": 11,
    "reply": '希望后期能添加更多的功能00',
    "create_time": '2018-09-23'
  },
  {
    "id": 12,
    "reply": '希望后期能添加更多的功能01',
    "create_time": '2018-09-23'
  }
]

const content = `<p><span style="font-weight: bold;">演员的演技有多野，去掉特效你就知道。</span></p>
        <p><span style="font-size: xx-large;">再丑的毛绒道具，在一名成熟的演员的手上都能完成一段忘却自我的无实物表演。</span></p>
        <p><span style="text-decoration-line: underline;">你充满爱意的望着躺着腿上的它，它即温柔又凶狠。当然了，凶狠是对别人的，而温柔只属于你。</span></p>
        <div>
          <div>
            <p><span style="background-color: rgb(194, 79, 74);">在前后端完全分离的情况下，Vue项目中实现token验证大致思路如下：</span></p>
            <p>1、第一次登录的时候，前端调后端的登陆接口，发送用户名和密码<br> 2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token
          <br><span style="font-style: italic;">
                3、前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面<br>
                4、前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面<br>
                5、每次调后端接口，都要在请求头中加token<br>
                6、后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，验证失败（例如：token过期）就返回401，请求头中没有token也返回401<br>
                7、如果前端拿到状态码为401，就清除token信息并跳转到登录页面
          </span>
        </p>
      </div><br><br>作者：world_7735
      <br>链接：https://www.jianshu.com/p/5727f91b56c1<br>来源：简书<br>简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。</div>
  </div>`;
export { articles, letter, content };