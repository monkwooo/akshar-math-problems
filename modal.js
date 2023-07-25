class GenericModal {
    _html = `
        <style>
            #modal {
                width: 100%;
                height: 100%;
                background: #C1ECE4;
                position: absolute;
                top: 0;
                left: 0;
            }

            #modal > div > span {
                position: absolute;
                right: -27px;
                top: -27px;
                cursor: pointer;
                background: white;
                border-radius: 30px;
                width: 60px;
                height: 60px;
                font-weight: bold;
                font-size: 4em;
                line-height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #FFD0D0;
                border: 2px solid #FFD0D0;
                border-bottom-width: 0;
                border-left-width: 0;
            }

            #modal > div {
                background: white;
                border: 2px solid #FFD0D0;
                padding: 27px;
                max-height: 80vh;
                position: absolute;
                top: 50%;
                left: 50%;
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                box-shadow: 0 4px 8px 0 #FFD0D0;
                transition: 0.3s;
                border-radius: 5px;
            }

            #modal > div > div {
                overflow-y: scroll;
                max-height: 100%;
            }

            _SIZE_

            .hide {
                display: none;
            }
        </style>
        <div id="modal" class="hide">
            <div>
                <span>×</span>
                <div></div>
            </div>
        </div>
    `;
    sizes = [
        {
            name: 'small',
            width: '40%',
            height: '40%',
        },
        {
            name: 'medium',
            width: '60%',
            height: '60%',
        },
        {
            name: 'full',
            width: '80%',
            height: '80%',
        },
    ];
    constructor(){
        const _modal = new DOMParser().parseFromString(this._html.replace("_SIZE_", this._generateSizes()), "text/html");
        document.head.appendChild(_modal.head.children[0]);
        document.body.appendChild(_modal.body.children[0]);

        document.querySelector("#modal > div > span").onclick = this.closeAlert.bind(this);
    }
    _generateSizes(){
        return this.sizes.map(({ name, width, height }) => `#modal > div.${name} {
            width: ${width};
            height: ${height};
        }`).join('\n');
    }
    showAlert({ name }){
        document.querySelector("#modal").classList.remove("hide");
        const _conatiner = document.querySelector("#modal > div");
        for(let size of this.sizes){
            _conatiner.classList.remove(size.name);
        }
        _conatiner.classList.add(name);
        
        return document.querySelector("#modal > div > div")
    }
    closeAlert(){
        document.querySelector("#modal").classList.add("hide");
    }
}

exports = { GenericModal }