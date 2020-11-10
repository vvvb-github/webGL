class EventSystem {
    constructor() {
        this.keyTable = [];
        for(let i=0;i<150;++i) this.keyTable.push(false);
        this.keyBoard = {
            Back: ()=>{return this.keyTable[8]},
            Tab: ()=>{return this.keyTable[9]},
            Enter: ()=>{return this.keyTable[13]},
            CapsLock: ()=>{return this.keyTable[20]},
            Space: ()=>{return this.keyTable[32]},
            LeftArrow: ()=>{return this.keyTable[37]},
            UpArrow: ()=>{return this.keyTable[38]},
            RightArrow: ()=>{return this.keyTable[39]},
            DownArrow: ()=>{return this.keyTable[40]},
            Zero: ()=>{return this.keyTable[48]},
            One: ()=>{return this.keyTable[49]},
            Two: ()=>{return this.keyTable[50]},
            Three: ()=>{return this.keyTable[51]},
            Four: ()=>{return this.keyTable[52]},
            Five: ()=>{return this.keyTable[53]},
            Six: ()=>{return this.keyTable[54]},
            Seven: ()=>{return this.keyTable[55]},
            Eight: ()=>{return this.keyTable[56]},
            Nine: ()=>{return this.keyTable[57]},
            A: ()=>{return this.keyTable[65]},
            B: ()=>{return this.keyTable[66]},
            C: ()=>{return this.keyTable[67]},
            D: ()=>{return this.keyTable[68]},
            E: ()=>{return this.keyTable[69]},
            F: ()=>{return this.keyTable[70]},
            G: ()=>{return this.keyTable[71]},
            H: ()=>{return this.keyTable[72]},
            I: ()=>{return this.keyTable[73]},
            J: ()=>{return this.keyTable[74]},
            K: ()=>{return this.keyTable[75]},
            L: ()=>{return this.keyTable[76]},
            M: ()=>{return this.keyTable[77]},
            N: ()=>{return this.keyTable[78]},
            O: ()=>{return this.keyTable[79]},
            P: ()=>{return this.keyTable[80]},
            Q: ()=>{return this.keyTable[81]},
            R: ()=>{return this.keyTable[82]},
            S: ()=>{return this.keyTable[83]},
            T: ()=>{return this.keyTable[84]},
            U: ()=>{return this.keyTable[85]},
            V: ()=>{return this.keyTable[86]},
            W: ()=>{return this.keyTable[87]},
            X: ()=>{return this.keyTable[88]},
            Y: ()=>{return this.keyTable[89]},
            Z: ()=>{return this.keyTable[90]},
            Shift: ()=>{return this.keyTable[16]}
        }

        document.onkeydown = ev=>{
            this.keyTable[ev.keyCode] = true;
        }

        document.onkeyup = ev=>{
            this.keyTable[ev.keyCode] = false;
        }
    }
}