"ui";

//###############班花模板UI云端




// storage变量为框架自带的内部储存变量，不可删除！！！
// 把需要保存内容的控件ID存到viewIdArr数组变量中，就能实现自动保存UI内容，目前支持编辑框、单选框、多选框、下拉菜单、开关五类控件的数据保存

//声明主题颜色
const COLOR = '#FFD700';
//声明脚本标题
const TITLE = '班花模板-AutoJs第三套模板';

//需要保存的空间ID
var viewIdArr = ['gdbl', 'sxyc'];

//声明本地储存
storage = storages.create('jf');

//声明常用变量
const CONFIG = storage.get('CONFIG');

//加载UI框架
drawUI();

//声明脚本函数
var scriptFun;
threads.start(function () {
    scriptFun = new Function('', getJianGuoYunFile(CONFIG.path+'script.js'));

});

//绘制UI界面
var UI = ui.inflate(
    <vertical>
        <horizontal>
            <text text='小区名称：'></text>
            <input id='gdbl' hint='请输入一个0-1的小数' w='*' textType='number'></input>
        </horizontal>
        <horizontal>
            <text text='刷新延迟：'></text>
            <input id='sxyc' hint='请输入一个范围' w='*' textType='number'></input>
        </horizontal>
    </vertical>, ui.body, true
);




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



//设置UI界面的内容
try {
    if (viewIdArr != null) setViewContent(viewIdArr);
} catch (_err) {
    log('设置UI内容报错！');
}

/**
 * 
 * @param {控件ID数组}} _viewArr 
 */
function saveViewContent (_viewArr) {

    let _viewDataArr = {};
    _viewArr.forEach((_view) => {
        switch (ui.findView(_view).getAccessibilityClassName()) {
            case 'android.widget.EditText':
                // log('文本控件');
                _viewDataArr[_view] = ui[_view].text();
                break;
            case 'android.widget.CheckBox':
                // log('多选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.RadioButton':
                // log('单选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.Spinner':
                // log('下拉菜单控件');
                _viewDataArr[_view] = ui[_view].getSelectedItemPosition();
                break;
            case 'android.widget.Switch':
                log('开关控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            default:
                log('当心 你的控件不符合规范');
        }
    });
    log(_viewDataArr);
    log('开始写入本地储存');
    storage.put('viewDataArr', _viewDataArr);
}

/**
 * 
 * @param {控件ID数组}} _viewArr 
 */
function setViewContent (_viewArr) {
    //开始读取本地储存
    let _viewDataArr = storage.get('viewDataArr')

    log(_viewDataArr);
    _viewArr.forEach((_view) => {
        switch (ui.findView(_view).getAccessibilityClassName()) {
            case 'android.widget.EditText':
                ui[_view].setText(_viewDataArr[_view]);
                break;
            case 'android.widget.CheckBox':
                ui[_view].checked = _viewDataArr[_view];
                break;
            case 'android.widget.RadioButton':
                ui[_view].checked = _viewDataArr[_view];
                break;
            case 'android.widget.Spinner':
                ui[_view].setSelection(_viewDataArr[_view]);
                break;
            case 'android.widget.Switch':
                ui[_view].checked = _viewDataArr[_view];
                break;
            default:
                log('当前输入错误！！！');
        }
    });

}

/**
 * 
 * @param {坚果云服务器地址 字符串} _path 
 */
function getJianGuoYunFile (_path) {
    // log('_path::'+_path);
    http.__okhttp__.setTimeout(3e4);

    //声明本地储存
    let st = storages.create('jf');

    //声明常用变量
    let config = st.get('CONFIG');

    let  _res = http.get('http://dav.jianguoyun.com/dav/' + _path , {
        headers : {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(config.user + ':' + config.key).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    r = _res;

    if (r.statusCode == 200) {
        // log("打印："+r.body.string());
        return r.body.string();

    } else {
        log('坚果云服务器访问失败!'+r.statusCode)
        return null;
    }
}

/**
 * 
 * @param {坚果云文件地址 字符串地址} _path 
 */
function downloadModFile (_path) {
    let _modString = getJianGuoYunFile (_path);
    let _fileName = _path.match(/[^\/]+.js/)[0];
    // log('_modString:'+_modString);
    // log('_fileName:'+_fileName);

    files.write('./'+_fileName, _modString);
    // log('js文件写入成功');
}

/**
 * 
 * @param {当前父目录下的js文件路径 字符串地址} _path 
 */
function importMods (_path) {
    _path = CONFIG.path + _path
    // log('要访问的地址为：'+CONFIG.path);
    downloadModFile(_path);
    return require(_path.match(/[^\/]+.js/)[0]);
}

function drawUI () {
    ui.layout(
        <frame>
            <vertical>
                <appbar bg='{{this.COLOR}}'>
                    <toolbar title='{{this.TITLE}}'></toolbar>
                </appbar>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
                    <vertical>
                        <Switch id='autoService' text='无障碍服务' checked='{{auto.service != null}}' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='windowService' text='悬浮窗服务' checked='' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='deBugService' text='调试服务' checked='' padding='8 8 8 8' textSize='15sp'></Switch>

                        <horizontal>
                            <button id='start' gravity='center' layout_weight='1' text='开始运行' textSize='16sp' textColor='#000000'></button>
                            <button id='quit' gravity='center' layout_weight='1' text='退出脚本' textSize='16sp' textColor='#000000'></button>
                        </horizontal>
                    </vertical>
                </card>
                <ScrollView>
                    <vertical id='body' w='*' h='*' padding='5dp'>

                    </vertical>
                </ScrollView>
            </vertical>
        </frame>
    );
    //设置状态栏颜色
    ui.statusBarColor(COLOR);

    //无障碍服务按钮单机事件
    ui.autoService.on('click', () => {
        ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
    });

    var open_err, close_err;
    //悬浮窗权限
    ui.windowService.on('click', () => {
        if (this.scriptThreads && this.scriptThreads.isAlive()) {

            log('脚本线程存在！并且脚本线程存活');
            this.windowImg = '@drawable/ic_pause_circle_outline_black_48dp';
        } else {
            log('脚本线程不存在');
            this.windowImg = '@drawable/ic_play_circle_filled_white_black_48dp';
        }
        if (ui.windowService.isChecked()) {
            toastLog('开启悬浮窗');
            try {
                openWindow();
            } catch (_err_a) {
                log('打开悬浮窗报错');
                ui.windowService.setChecked(false);

            }
        } else {
            try {
                toastLog('关闭悬浮窗');
                closeWindow();
            } catch (_err_b) {
                log('关闭悬浮窗报错');
                ui.windowService.setChecked(true);
            }
        }
    });

    //调试服务
    ui.deBugService.on('click', ()=> {
        if (ui.deBugService.isChecked()) {
            toastLog('开启调试模式');
            console.show();
        } else {
            toastLog('关闭调试模式');
            console.hide();
        }
    });

    //回到本界面时，触发resume事件
    ui.emitter.on('resume', ()=> {
        auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);

    });

    //开始按钮单击事件
    ui.start.on('click', ()=> {


        if (this.scriptThreads && this.scriptThreads.isAlive()) {
            this.windowImg = '@drawable/ic_pause_circle_outline_black_48dp';
            log('脚本线程存在 ');

        } else {
            log('脚本线程不存在！');
            this.windowImg = '@drawable/ic_pause_circle_outline_black_48dp';
            log('开始一个新线程 执行脚本');
            try {
                if (viewIdArr != null) saveViewContent(viewIdArr);

            } catch (_err) {
                toastLog('保存UI配置报错！');

            }
            this.scriptThreads = threads.start(this.scriptFun);
        }

        if (this.windowObj) this.windowObj.windowButton.setSource(this.windowImg);
    })

    //退出脚本单击事件
    ui.quit.on('click', () => {
        exit();
    });

    function openWindow () {
        if (!this.windowObj) {

            log('绘制悬浮窗口');
            this.windowObj = floaty.rawWindow(
                <frame>
                    <img w="auto" h="auto" src="{{this.windowImg}}" id='windowButton'/>
                </frame>
            );

            //设置悬浮窗位置
            this.windowObj.setPosition(0, device.height/2);

            let window = this.windowObj;
            //记录按键被按下时的触摸坐标
            var x = 0, y = 0;
            //记录按键被按下时的悬浮窗位置
            var windowX, windowY;
            //记录按键被按下的时间以便判断长按等动作
            var downTime;

            window.windowButton.setOnTouchListener(function(view, event){
                switch(event.getAction()){
                    case event.ACTION_DOWN:
                        x = event.getRawX();
                        y = event.getRawY();
                        windowX = window.getX();
                        windowY = window.getY();
                        downTime = new Date().getTime();
                        return true;
                    case event.ACTION_MOVE:
                        //移动手指时调整悬浮窗位置
                        window.setPosition(windowX + (event.getRawX() - x),
                            windowY + (event.getRawY() - y));
                        //如果按下的时间超过1.5秒判断为长按，退出脚本
                        if(new Date().getTime() - downTime > 1500){
                            toastLog('长按退出脚本！');
                            exit();
                        }
                        return true;
                    case event.ACTION_UP:
                        //手指弹起时如果偏移很小则判断为点击
                        if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                            // toastLog('点击了按钮');
                            windowButtonClick();
                        }
                        return true;
                }
                return true;
            });

            function windowButtonClick() {

                // log('点击了开始');
                // log('脚本线程：'+this.scriptThreads)
                // log('悬浮窗：'+this.windowObj)
                // log('悬浮窗图标：'+this.windowImg)


                if (this.windowImg == '@drawable/ic_play_circle_filled_white_black_48dp') {
                    log('现在是播放');
                    this.windowImg = '@drawable/ic_pause_circle_outline_black_48dp';
                } else {
                    log('现在是停止');
                    this.windowImg = '@drawable/ic_play_circle_filled_white_black_48dp';
                }
                this.windowObj.windowButton.setSource(this.windowImg);

                if (this.scriptThreads && this.scriptThreads.isAlive()) {
                    log('脚本存在 并且脚本线程存活')
                    this.scriptThreads.interrupt();
                } else {
                    log('脚本不存在  并且脚本线程不存活');
                    try {
                        if (viewIdArr != null ) saveViewContent(viewIdArr);
                    } catch (_err) {
                        log('保存控件信报错@')
                    }
                    this.scriptThreads = threads.start(this.scriptFun);
                }

            }
        } else {
            toastLog('悬浮窗已打开！');
        }
    }

    function closeWindow () {
        if(this.windowObj != null) {
            this.windowObj.close();
            this.windowObj = null;
        } else {
            toastLog('悬浮窗已关闭');
        }
    }

}



