(function(){
    var joker = function(){
        this.component = "000";
    }
   
    var jokerPro = joker.prototype;
    /**
     * 自定义组件
     */
    jokerPro.createClass = function(detail){
        var component =  detail.render();
        return this.componentToHtml(component);
    }
    /**
     * 组件渲染
     * @param {*} component 
     * @param {*} elem 
     */
    joker.prototype.domRender = function(component,elem){
        elem.innerHTML =this.componentToHtml(component) ;
    }
    /**
     * 组件转换html
     * @param {*} component 
     */
    jokerPro.componentToHtml = function(component){
        return component;
    }


    var newJoker = new joker();
    var newJokerDOM = newJoker.domRender;
    window.Joker = newJoker;

})()