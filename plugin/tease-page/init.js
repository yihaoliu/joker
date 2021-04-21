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
        // var path = key1;
        var originSrc = data.originSrc;
        var activeSrc = data.activeSrc;
        const everyOptions = data[key1].operation;
        for(let key2 in everyOptions) {
            var path=key1+ '->'+key2;
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