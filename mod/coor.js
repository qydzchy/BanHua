let coorMod = {};

//寻找一个文本控件  如果找到了就用坐标去点击
coorMod.clickText = (content, delay) => {
    delay = delay || 1;
    let r = text(content).findOne(delay * 1000);
    if (r) {
        log('开始点击：'+content);
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        log('clickText:没有找到控件')
        return null
    }
}

coorMod.clickDesc = (content, delay) => {
    delay = delay || 1;
    let r = desc(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());
    } else {
        log('clickDesc:没有找到控件')
        return null
    }
}

coorMod.clickId = (content, delay) => {
    delay = delay || 1;

    let r = id(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        log('clickId:没有找到控件')
        return null
    }
}

coorMod.clickClassName = (content, delay) => {
    delay = delay || 1;

    let r = className(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        log('clickClassName:没有找到控件')
        return null
    }
}

//利用坐标去点击一个已有的控件
coorMod.clickView = (content) => {
    click(content.bounds().centerX(), content.bounds().centerY());
}


module.exports = coorMod;
