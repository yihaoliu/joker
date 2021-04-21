var dataKey = 'e10adc3949ba59abbe56e057f20f883e';

function operationList() {
    var data = JSON.parse(localStorage.getItem(dataKey));
    var list = {}
    var activeSrc = location.href;
    var iframeDoms = document.querySelectorAll('iframe')
    var global = window;
    if (iframeDoms && iframeDoms.length > 0) {
        var iframeDom = iframeDoms[0];
        activeSrc = iframeDom.src;
        global = iframeDom.contentWindow;

    }
    var myDocument = global.document;
    var operationDoms = myDocument.querySelectorAll('td a');
    operationDoms.forEach((aDom) => {
        var activeKey = aDom.innerHTML.replace(/[\r\n]/g,"").trim();
        var href = aDom.getAttribute('data-href') || aDom.href;
        href = decodeURI(href)
        if(list[activeKey]) {
            list[activeKey].push(href);
        } else {
            list[activeKey] = [href];
        }
    })
    for(let key in data) {
        if(data[key].activeSrc == activeSrc) {
            data[key].operation = list;
        }
    }
    localStorage.setItem(dataKey, JSON.stringify(data));
    console.log(list);
   
}

function getList() {
    var localGet = function(key){
        return localStorage.getItem(key)
    }
    var localSet = function(key, content){
        localStorage.setItem(key,content)
    }
   
    var typesDom = document.querySelectorAll('#select_type a');
    var data= localGet(dataKey) ? JSON.parse(localGet(dataKey)) : {};
    let activedom = null;
    let nextDom = null;
    typesDom.forEach((dom) => {
        // item
        if(activedom) {
            nextDom = dom;
            activedom = null;    
        }
        var classList = dom.classList;
        if (classList.contains('act_select')) {
            activedom = dom;
            var typeKey =activedom.innerHTML;
            var originSrc = location.href;
            var iframeDom = document.querySelectorAll('iframe')
            var activeSrc = originSrc;
            if (iframeDom && iframeDom.length > 0) {
                activeSrc = iframeDom[0].src;
            }
            data[typeKey] = {
                originSrc,
                activeSrc,
            }
        }
    })
    localSet(dataKey, JSON.stringify(data));
    operationList()
    nextDom && nextDom.click();

}
getList()

var mapping = {
    '/igate/wmact/': 'waimai_mfe_business_marketing_b',
    '/igate/actwebpc/' : '闪购业务',
    '/igate/wmactpc/': 'waimai_e_act_pc',
    '/reuse/actfe/': 'waimai_reuse_act_fe',
    '/igate/wmmactpc/' : 'waimai_m_act_pc',

}

function mappingFormat(url){
    var project = null;
    for(let key in mapping) {
        if(url.indexOf(key) != -1) project = mapping[key];
    }
    if(project) {
        return project;
    }
    if(url.indexOf('/reuse/') != -1) {
        return 'waimai_reuse_promotion_api';
    }
    if(url.indexOf('javascript:') != -1) {
        return null;
    }
    return 'waimai_m_promotion'
}
function dataFormat(data){
    const newData = {};
    for(let key1 in data) {
        var path = key1;
        var originSrc = data.originSrc;
        var activeSrc = data.activeSrc;
        const everyOptions = data[key1].operation;
        for(let key2 in everyOptions) {
            path+='-->'+key2;
            var allUrls = everyOptions[key2];
            allUrls.forEach((item) => {
                project = mappingFormat(item)
                if(project) {
                    let obj = {};
                    obj[path] = item;
                    if(newData[project]){
                        newData[project].push(obj);
                    }else {
                        newData[project] = [obj]
                    }
                }
            })
            

            
        }
        
    }
    localStorage.setItem('-----', JSON.stringify(newData));  
}
dataFormat(list)