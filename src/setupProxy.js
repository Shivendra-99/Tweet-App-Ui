const {createProxyMiddleware} =require('http-proxy-middleware');
module.exports=function(app){
    app.use(
        createProxyMiddleware('/api/v1.0/tweets',{
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {
                "^api/": "",
            },headers: {
                Connection: "keep-alive"
            }
        })
    );
}