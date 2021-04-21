(function () {
    const LXSendReport = (lxdata) => {
        const getUrlParam = (name, url) => {
            url = url ? String(url) :
                /* istanbul ignore next */
                window.location.href;
            var results = new RegExp('[\\?&]' + String(name) + '=([^&#]*)').exec(url);
    
            if (!results) {
                return '';
            }
    
            return results[1] ||
                /* istanbul ignore next */
                '';
        }
        const getCookie = (cookieName) => {
            if (typeof cookieName !== 'string' || !cookieName.length) {
                return '';
            }
            var name = cookieName + '=';
            var cookies = document.cookie.split(';');
            for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
                var cookie = cookies_1[_i];
                var cookieStr = cookie.trim();
                if (cookieStr.indexOf(name) === 0) {
                    return decodeURIComponent(cookieStr.substring(name.length, cookieStr.length));
                }
            }
            return '';
        }
        const getWmPoiId = () => {
            const wmPoiId = parseInt(getUrlParam('wmPoiId') || getCookie('wmPoiId'));
            return window.isNaN(wmPoiId) ? 0 : wmPoiId;
        }
        const getSource = ()=> {
            const source = window.location.host.indexOf("hd.waimai") > -1 ? 'm' : 'b';// 端类型，1商家端，0先富
            return source;
        }
        class LxHelper {
            // 事件名映射
            // 目前仅支持这三种事件，如果需要支持 pay 事件等，需要特殊处理上报逻辑，参数顺序不听
            eventMap = {
                pv: 'pageView',
                mc: 'moduleClick',
                mv: 'moduleView',
            };
    
            // 通用业务参数map，为了方便查找使用对象
            _primaryKey = {
                poi_id: true,
                index: true,
                product_id: true,
            }
    
            getEventName(id = '') {
                // 以 c_ 开头的id是 pageView
                if (id.startsWith('c_')) {
                    return this.eventMap.pv;
                }
                // 其他一般是 bid，使用后缀区分 mc 和 mv
                // eg： b_waimai_e_qtex1uvx_mv   b_waimai_e_v0boparu_mc
                const name = id.slice(id.length - 2);
                return this.eventMap[name] || 'moduleClick';
            }
    
            // 拆分 通用参数 和 业务参数
            genLxData(data = {}) {
                if (!data) { return {}; }
                const keys = Object.keys(data);
                const lxData = {
                    custom: {}
                };
                keys.forEach(key => {
                    // 上报时 通用参数需要放在最外层，其他都是业务参数，需要放在 custom 里面
                    if (this._primaryKey[key]) {
                        lxData[key] = data[key];
                    } else {
                        lxData.custom[key] = data[key];
                    }
                });
                return lxData;
            }
        }
        let { id, data = {}, options = {}, env = null } = lxdata;
        let lxHelper = new LxHelper();
        const categorys = {
            m: 'waimai_m',
            b: 'waimai_e',
        }
        const origin = getSource();
        // if(getSource() === 'm'){
        //     // m端不上报数据
        //     return;
        // }
        options.category = categorys[origin];
    
        // 扩充默认环境参数
        data = Object.assign({
            poi_id: getWmPoiId(),
        }, data);
        // 获取上报类型 pv mc mv
        const eventName = lxHelper.getEventName(id);
        // 拆分上报数据为 通用参数 和 业务参数
        const lxData = lxHelper.genLxData(data);
        const LXPorit = LXAnalytics || Analytics;
        if (eventName === lxHelper.eventMap.pv) {
            LXPorit(eventName, lxData, env, id, options);
        } else {
            LXPorit(eventName, id, lxData, options);
        };
    }
    window.LXSendReport = LXSendReport;
})()