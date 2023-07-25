class DomReference extends Object {
    constructor(config){
        super();
        for(let key in config){
            this[key] = config[key];
        }
        this._makeLeafNodes(this);
    }
    _makeLeafNodes(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] === "string"){
                    obj[key] = this._getElement(obj[key]);
                }else if(typeof obj[key] === "object"){
                    this._makeLeafNodes(obj[key]);
                }
            }
        }
    }
    _getElement(key){
        return document.getElementById(key);
    }

    putValues(valueObject, obj){
        if(!obj){
            obj = this;
        }
        for(let key in valueObject){
            if(valueObject.hasOwnProperty(key) && obj[key] !== undefined){
                if(typeof valueObject[key] === "object"){
                    this.putValues(valueObject[key], obj[key])
                }else{
                    this._putAtomicValue(valueObject[key], obj[key]);
                } 
            }
        }
    }
    _putAtomicValue(value, domRef){
        if(domRef.tagName === "INPUT"){
            domRef.value = value;
        }else{
            domRef.innerHTML = value;
        }
    }
    getValues(refObject, obj){
        if(!obj){
            obj = this;
        }
        for(let key in refObject){
            if(refObject.hasOwnProperty(key) && obj[key] !== undefined){
                if(typeof refObject[key] === "object"){
                    refObject[key] = this.getValues(refObject[key], obj[key])
                }else{
                    refObject[key] = this._getAtomicValue(obj[key]);
                } 
            }
        }
        return refObject;
    }
    _getAtomicValue(domRef){
        if(domRef.tagName === "INPUT"){
            return domRef.value;
        }else{
            return domRef.innerHTML;
        }
    }
}

exports = { DomReference }