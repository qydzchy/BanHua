let viewMod = {};

//寻找一个text控件 如果找不到就点击back按钮
viewMod.findTextViewOfBack = (content, delay) => {
    while (1) {
        let r = text(content).findOne(delay || 1000);
        if (r) {
            log('findTextViewOfBack:'+'找到了-->>  '+r);
            break;
        } else {
            log('findTextViewOfBack:'+'没有找到-->>  '+r);
            back();
        }
    }
}

viewMod.findDescViewOfBack = (content, delay) => {
    while (1) {
        let r = desc(content).findOne(delay || 1000);
        if (r) {
            log('findDescViewOfBack:'+'找到了-->>  '+r);
            break;
        } else {
            log('findDescViewOfBack:'+'没有找到-->>  '+r);
            back();
        }
        sleep(delay * 1000);
    }
}

viewMod.findIdViewOfBack = (content, delay) => {
    while (1) {
        let r = id(content).findOne(delay || 1000);
        if (r) {
            log('findTextIdOfBack:'+'找到了-->>  '+r);
            break;
        } else {
            log('findTextIdOfBack:'+'没有找到-->>  '+r);
            back();
        }
        sleep(delay * 1000);
    }
}

viewMod.findClassNameViewOfBack = (content, delay) => {
    while (1) {
        let r = className(content).findOne(delay || 1000);
        if (r) {
            log('findClassNameViewOfBack:'+'找到了-->>  '+r);
            break;
        } else {
            log('findClassNameViewOfBack:'+'没有找到-->>  '+r);
            back();
        }
        sleep(delay * 1000);
    }
}

viewMod.textArrayWait = (_arr) => {
    for (let i = 0; i < _arr.length; i++) {
        while (!text(_arr[i]).exists());
    }
}

viewMod.textArrayNotExists = (_arr) => {
    for (let i = 0; i < _arr.length; i++) {
        while(text(_arr[i]).exists());
    }
}
module.exports = viewMod;
