const Store = {
    setItem: (key, value) => {
        let _value = value;
        if(typeof _value !== "string"){
            _value = JSON.stringify(_value);
        }
        window.localStorage.setItem(key, _value);
    },
    getItem: (key) => {
        let _value = window.localStorage.getItem(key);
        if(!_value) return
        try{
            _value = JSON.parse(_value);
            return _value;
        }catch(e){
            return;
        }
    } 
}

class Score extends Array {
    constructor() {
        super()
        /** Load old data **/
        let output = Store.getItem("ScoreCard");

        Array.isArray(output) &&
        output.forEach(this._pushOneItem.bind(this));

        /** Create a defert to save current state */
        this._saveTimeout();

        return this;
    }
    _pushOneItem(item){
        String(item.duration).length < 10 &&
        this.push(item);
    }
    _save(){
        Store.setItem("ScoreCard", this);
        this._saveTimeout();
    }
    _saveTimeout(){
        clearTimeout(this._timeout);
        this._timeout = setTimeout(this._save.bind(this), 10000);
    }
    getReport(){
        let totalTime = 0;
        let totalProblems = 0;
        this.forEach(function ({ duration }) {
            if(this._isIncomplete(duration)) return;
            totalTime += duration
            totalProblems += 1;
        }.bind(this));
        return {
            totalProblems: totalProblems,
            totalTime: totalTime.toFixed(2),
            average: (totalTime/totalProblems).toFixed(2)
        }
    }

    startProblem(problem){
        if(this.length){
            const _lastIndex = this.length - 1;
            if(this._isIncomplete(this[_lastIndex].duration)){
                this[_lastIndex].duration = new Date().getTime();
            } else {
                this.push({ problem, duration: new Date().getTime() });
            }
        }else{
            this.push({ problem, duration: new Date().getTime() });
        }
    }
    endProblem(){
        if(!this.length) return;
        const _lastIndex = this.length - 1;
        this[_lastIndex].duration = (new Date().getTime() - this[_lastIndex].duration) / 1000;
    }
    _isIncomplete(duration){
        return duration > 1000000000;
    }
}

exports = Score