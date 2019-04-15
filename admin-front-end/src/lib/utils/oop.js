/**
 * 判断对象是否指定类型的实例
 * @param {Object} sourceObject 
 * @param {Function} targetClass 
 * @param {Boolean} isDirect 
 */
function isInstanceOf(sourceObject,targetClass,isDirect){
    let proto = Object.getPrototypeOf(sourceObject);
    if(proto ===undefined || proto === null ){
        return false;
    }
    else if(proto.constructor === targetClass){
        return true;
    }
    //如果是允许查看目标对象的基类是否符合目标类型，则递归查找
    else if(!isDirect){
        return isInstanceOf(proto,targetClass,isDirect)
    }else {
        return false;
    }
}

export {
    isInstanceOf
}