// 认证模块
const Auth = {
    // 检查是否已登录
    isLoggedIn() {
        const token = localStorage.getItem('auth_token');
        const sessionToken = sessionStorage.getItem('auth_token');
        return token || sessionToken;
    },

    // 登录
	// 3. 覆盖  原  login  方法 ， 追加  “ 去  Bmob  查  user  表 ”  逻辑
	login(username, password, rememberMe = true) {
	    /* 3-1  立即  返回  一个  Promise ， 让  外层  await  或者  .then() */
	    return new Promise((resolve, reject) => {
	        /* 3-2  创建  查询  实例 ， 指定  表名  为  user */
	        const query = Bmob.Query('user');
	        /* 3-3  添加  条件 ： 字段  username  等于  用户  输入  的  账号 */
	        query.equalTo('tel', '===', username);
	        /* 3-4  添加  条件 ： 字段  password  等于  用户  输入  的  密码  （  明文  比对  演示  ） */
	        query.equalTo('pass', '===', password);
	        /* 3-5  发起  网络  请求 ， 只  取  第  一条  匹配  记录 */
	        query.find().then(results => {
	            /* 3-6  results  是  数组 ， 长度  >0  说明  账号  密码  正确 */
	            if (results.length > 0) {
	                /* 3-7  拿  到  这条  记录  对象 */
	                const userRecord = results[0];
	                /* 3-8  用  原有  逻辑  生成  本地  token */
	                const token = this.generateToken(username);
	                /* 3-9  根据  是否  勾  选  “ 记住  我 ”  决定  存  哪里 */
	                if (rememberMe) {
	                    localStorage.setItem('auth_token', token);
	                    localStorage.setItem('username', username);
	                } else {
	                    sessionStorage.setItem('auth_token', token);
	                    sessionStorage.setItem('username', username);
	                }
	                /* 3-10  告诉  外层  “ 成功 ” */
	                resolve(true);
	            } else {
	                /* 3-11  没  匹配  到  任何  记录 ， 登录  失败 */
	                resolve(false);
	            }
	        }).catch(err => {
	            /* 3-12  网络  异常  或  表  不  存在  等  情况 */
	            console.error('Bmob 查询失败', err);
	            resolve(false);
	        });
	    });
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    // 登出
    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('username');
        window.location.href = 'login.html';
    },

    // 生成模拟token
    generateToken(username) {
        return btoa(username + '_' + Date.now() + '_' + Math.random());
    },

    // 获取当前用户名
    getCurrentUser() {
        return localStorage.getItem('username') || sessionStorage.getItem('username');
    },

    // 检查权限守卫
    requireAuth() {
        if (!this.isLoggedIn()) {
            // 保存当前页面URL，登录后返回
            sessionStorage.setItem('redirect_url', window.location.href);
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // 自动登录检查
    checkAutoLogin() {
        if (this.isLoggedIn() && window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }
};

// 自动登录检查
Auth.checkAutoLogin();