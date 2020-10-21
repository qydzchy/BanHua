"ui";

//###############班花模板客户端


//定义常量
const CONFIG = {
    "path": "TaoBao/班花模板2.0/",
    "user": "17685034710@163.com",
    "key": "a4vi4tk4femzzjgc"
}

//保存CONFIG到本地储存，读取的时候访问jf.CONFIG即可

saveConfig('jf');



//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                 BUG辟易
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？






//加载界面绘制
ui.layout(
    <frame bg='#000000' w='*' h='*'>
        <text id='loading' text='' w='auto' h='auto' layout_gravity='center' textColor='#ffffff' textSize='22sp'></text>
    </frame>
);

//设置状态栏颜色
ui.statusBarColor('#000000');

//开始UI加载线程

let uiThreads = threads.start(uiThreadsFun);

//开始HTTP线程
let uiHttp = threads.start(uiHttpFun);

/**
 * 
 * @param {字符串参数} _name 
 */
function saveConfig (_name) {
    let storage = storages.create(_name);
    storage.put('CONFIG', CONFIG);
}

function uiHttpFun() {
    let _api_ = 'http://dav.jianguoyun.com/dav/', _res_ = http.get(_api_ + CONFIG.path + 'mainActivity.js', {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(CONFIG.user + ':' + CONFIG.key).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
            }
        }
    );
    engines.execScript('mainActivity', _res_.body.string()); 
    if (uiThreads.isAlive()) uiThreads.interrupt(); 
    ui.finish();
}

function uiThreadsFun() {
    let _dian_ = '.', _str_ = '', _nums_ = 0;
    while (1) {
        console.verbose('脚本加载线程执行中...');
        _nums_ == 0 ? _str_ = '加载中' : _str_ = _str_ + _dian_;
        ui.run(() => {
            ui.loading.setText(_str_); 
        });
        sleep(1000);
        _nums_++;
        if (_nums_ >= 4) _nums_ = 0;
    }
}