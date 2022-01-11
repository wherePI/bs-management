var http = require('http')
var fs = require('fs')
var url = require('url')
var flag = false
http
.createServer((res,rep) => {
	rep.setHeader("Access-Control-Allow-Origin", "*")
	rep.setHeader('Content-type','text/html;charset=utf-8')
    //  正确解析请求路径pathName
    // 可以把url解析成可操作的对象
    var paresPath = url.parse(res.url, true)
	var query = paresPath.query
    //  单独获取不包括查询字符串的路径
    var pathName = paresPath.pathname
	if (pathName === '/login') {
		fs.readFile('mock/user.json', (err, data) => {
			if (!err) {
				var user = JSON.parse(data).account
				for(var i=0; i< user.length; i++){
					 if(pd(query, user[i])) {
						 var srep = JSON.stringify(user[i])
						 rep.end(srep)
						 flag = true
					 }
				}
				if (!flag) {
					rep.statusCode = 500
				    rep.end('登录失败')
				}
				
			} else {
			   console.log('tag', '读取文件失败')
			}
		})
	}else if (pathName === '/route') {
    fs.readFile('mock/route.json', (err, data) => {
        if (!err) {
			let key = query.username
			var route = JSON.parse(data)[key]
            rep.end(JSON.stringify(route))
        } else {
           console.log('tag', '读取文件失败')
        }
    })
} else if (pathName ==='/pinglun') {
    rep.statusCode = 302
    rep.end()
} 
else {
    rep.end('找不到页面')
}
})
.listen(8089, () => {
    console.log('启动中。。。。。。')
})

function pd(a,b) {
	var objA = Object.keys(a)
	return objA.every(key => {
		return strying(a[key], b[key])
	})
}
function strying(c, d) {
	return c === d
}
// every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。

// every() 方法使用指定函数检测数组中的所有元素：

// 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
// 如果所有元素都满足条件，则返回 true。
// 注意： every() 不会对空数组进行检测。

// 注意： every() 不会改变原始数组。