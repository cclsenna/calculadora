class Fila {

    constructor(...itens) {
        this.arr = itens;
    };

    chegada(...insert) {
        this.arr.push(insert);
    };

    partida() {
        if (this.arr.length == 0) {
            console.log ("Fila vazia");
        } else {
            this.arr.shift();
        };
    };

    mostraFila() {
        for (let i=0 ; i < this.arr.length ; i++) {
            console.log(this.arr.length[i]);
            console.log(this.arr.length[i].indexOf);
        }
    }
}

const primeira = new Fila('5');
console.log(primeira);

// primeira.chegada(6,8,9);
console.log(primeira);
primeira.partida();
primeira.mostraFila();