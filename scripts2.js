let fila=[];
const operacaoPermitida=['sum','multiply','subtract','divide'];
const operacaoEspecial=['clear','allClear','equals'];
const numPermitido=['0','1','2','3','4','5','6','7','8','9'];

//esta parte é responsável APENAS por ouvir os clicks e direcionar para a controller
$('.container__item--num').on('click',controller);


const operadorObj={
    _num1: '',
    _num2: '',
    _operador:'',
    _statusOperacao : false, //status pode ser true ou false 
    _lastUpdate: '',

    get lastUpdate(){
        return this._lastUpdate;

    },
    get statusOperacao(){
        return this._statusOperacao;

    },
    get operador(){
        return this._operador;
    },

    
    set setOperador(valorOperador){
        this._operador=valorOperador;
        this._lastUpdate='operador';
        this.atualizaStatus();

        return;
    },


    setNum(numero,tipo){
        if(tipo=='num1') {
            this._num1=numero;
            this._lastUpdate=tipo;
            this.atualizaStatus();
            return;

        }
        if (tipo==='num2') {
            this._num2=numero;
            this.lastUpdate=tipo;
            this.atualizaStatus();
            return;
        }
    },

    getNum(type){
        if (!type) {
            console.log('retornando os dois valores'+this._num1+' e '+this._num2);
            return (this._num1,this._num2);


        }
        console.log('vai retornar o type'+'_'+type);
        const num=this['_'+type];
        console.log(num);
        return num;
    },

    //metodo par alimpar a consulta após apertar algum botão especial
    limpa(){
        console.log('entrou no limpa');
        this._num1='';
        this._num2='';
        this._operador='';
        this._statusOperacao=false;
        this._lastUpdate='';
        return;
    },

 


    //grava o resultado depois da operação
    guardaResultado(resultado){
        this._num1=resultado;
        this._num2='';
        this._operador='';
        this._statusOperacao=false;
        this._lastUpdate='num1';
        return;

    },

    atualizaStatus(){
        if(this._num1&&this._num2&&this._operador){
            this._statusOperacao=true;
        }
    }

    

}


//declaração das funções
const operacoes= {
    sum(a,b){
        a=parseFloat(a);
        b=parseFloat(b);
        let result=a+b;
        exibe(result);
        //fila.unshift(result);
        operadorObj.guardaResultado(result);
        return;
    },
    
    subtract(a,b){
        a=parseFloat(a);
        b=parseFloat(b);   
        let result=a-b;
        exibe(result);
        //fila.unshift(result);
        operadorObj.guardaResultado(result);

        return;
    
    },
    
    multiply(a,b){
        a=parseFloat(a);
        b=parseFloat(b);
        let result=a*b;
        exibe(result);
        //fila.unshift(result);
        operadorObj.guardaResultado(result);

        return;
    
    },
    
    divide(a,b){
        a=parseFloat(a);
        b=parseFloat(b);
        let result=a/b;
        exibe(result);
        //fila.unshift(result);
        operadorObj.guardaResultado(result);

        return;
    
    },

    clear(){
        //fila=[];
        console.log('entrou na função clear');
        operadorObj.limpa();
        $('#value').text('0');
        return;
    },
    allClear(){
        console.log('entrou na função allclear');

        //fila=[];
        operadorObj.limpa();
        $('#value').text('0');



    },
    equals(a,b){
        console.log('entrou no equals coms os valores'+a+b);
        
        const funcao=operadorObj.operador;
        this.realizar=operacoes[funcao];
        //retira os valores da conta a ser utilizada
        /*
        for(let i =0;i<3;i++){
            fila.shift();
        }
        */
        this.realizar(a,b);
        operadorObj.limpa();        
        return;
    }
    
}


//função utilizada para exibir os valores na tabela
function exibe(numExibicao){
    let doc=document.querySelector('#value');
    doc.innerText=numExibicao;
    doc.style.display='none';
    setTimeout(()=>{doc.style.display='block';
},50) 
    
}

function controller(){
    console.log('entrou');
    const tipo=this.dataset.tipo;
    const valor=this.dataset.value;

    //verifica se o calculo já está ok    
    
    if(operadorObj.statusOperacao&&(tipo==='op')){
        console.log('ja temos os valores necessários necessarios');
        const realizaOperacao=operacoes[valor];
        const num1=operadorObj.getNum('num1');
        const num2=operadorObj.getNum('num2');
        realizaOperacao(num1,num2);
        return;
    }
   

    else{

        if(tipo==='special'){
            console.log('operacao especial ativada');
            let op=operacoes[valor];
            op();
            return;
        }

    //verifica se  o botao pressionado é de alguma operçaão matematica

        else if(tipo==='op'){
            console.log('operacao permitida ativada');

            if(operadorObj.lastUpdate==='operador'||operadorObj.lastUpdate==='num1'){
                operadorObj.setOperador=valor;
                return;
            }
            else return;        

        }

        else if(tipo==='num'){
            console.log('numero comum');
            addLista(this.innerText);
            return;


        }




}
console.log(operadorObj);
}


//função para adicionar a lista
function addLista(value){

    if(operadorObj.lastUpdate==='num1'||operadorObj.lastUpdate===''){
        console.log('entrou no num1');
        
        const num=operadorObj.getNum('num1');
        if(num.length===8) return;
        let novo =num+value;
        operadorObj.setNum(novo,'num1');
        exibe(operadorObj.getNum('num1'));
        return;   
    }

    else if(operadorObj.lastUpdate.num2==='num2'||operadorObj.lastUpdate==='operador'){
        console.log('entrou no num2');    
        const num=operadorObj.getNum('num2');
        if(num.length===8) return;
        let novo =num+value;
        operadorObj.setNum(novo,'num2');
        exibe(operadorObj.getNum('num2'));
        return;
    }
/*
    console.log("restou");
    operadorObj.setNum(value,'num1');
    exibe(value);
    console.log(value);
    */

}




/*

//essa função irá manipular o array da fila
function controller(){
    const id=this.id;
    const tipo=this.dataset.tipo;
    const value=this.dataset.value;

    //verifica se já podemos realizar o calculo
    if(operadorObj.statusOperacao&&value!='equals'){
        console.log('ja temos os valores necessarios');
        const realizaOperacao=operacoes[id];
        const  result=realizaOperacao(parseFloat(operadorObj.num1),parseInt(operadorObj.num2));
        return;
    }

    else if(operadorObj.statusOperacao&&value==='equals'){
        console.log('botao de igual');
        const realizaOperacao=operacoes[id];
        const  result=realizaOperacao(parseInt(operadorObj.num1),parseInt(operadorObj.num2),operadorObj.operador);
        return;

    }

    else{

    //verifica se o botão pressioando é de alguma operação que precisa ser feita instantaneamente
    if(tipo==='esp'){
        console.log('operacao especial ativada');
        let op=operacoes[id];
        op();
        return;        
    }


    //verifica se  o botao pressionado é de alguma operçaão matematica
    else if(tipo==='op'&&statusPreenchido){
        console.log('operacao permitida ativada');

        if(operadorObj.lastUpdate==='operador'){
            console.log('o operador já existe,substituindo pelo novo');
            //fila[fila.length-1]=this.id;
            operadorObj.setOperador(this.id);
            console.log(operadorObj);
        }
        else if({            
            addLista(this);

        }
        operador=this.id;
        return;
    }

    //else para os casos de numeros normais
    else if(tipo==='num'){
        console.log('numero comum');
        addLista(this.innerText);
        return;

    }
    else return;
}

console.log(fila);
 
}






function addLista(input){


    



    let arr=fila[fila.length-1];
   
    if(value.id){
        console.log('entrou aqui');
        fila.push(value.id);
        console.log(fila);
        return;
    }

    
    else if(parseInt(arr)){
        if(arr.length===8) return;
        fila[fila.length-1]+=value; 
        exibe(fila[fila.length-1]);
        console.log(fila);
        return;
    }    
    fila.push(value);
    exibe(value);
    console.log(fila);
}


*/