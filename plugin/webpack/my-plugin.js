class MyPlugin {
    constructor(optins = {}) {
        this.options = { ...optins }
    }
    apply(compiler) {
        compiler.hooks.done.tap('MyPlugin', function (compilation) {
            // 设计一个打包完成之后文件自动上传 cdn 的插件
            // 获取文件 output 文件夹 将文件夹下文件一次上传
            console.log('这是一个自定义插件');
        });
    }
}