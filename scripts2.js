
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
        return this['_'+type];
    },

    //metodo par alimpar a consulta após apertar algum botão especial
    limpa(){
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
        operadorObj.guardaResultado(result);
        return;
    },
    
    subtract(a,b){
        a=parseFloat(a);
        b=parseFloat(b);   
        let result=a-b;
        exibe(result);
        operadorObj.guardaResultado(result);
        return;
    
    },
    
    multiply(a,b){
        a=parseFloat(a);
        b=parseFloat(b);
        let result=a*b;
        exibe(result);
        operadorObj.guardaResultado(result);

        return;
    
    },
    
    divide(a,b){
        a=parseFloat(a);
        b=parseFloat(b);
        let result=a/b;
        exibe(result);
        operadorObj.guardaResultado(result);

        return;
    
    },

    clear(){
        operadorObj.limpa();
        $('#value').text('0');
        return;
    },
    allClear(){
        operadorObj.limpa();
        $('#value').text('0');



    },
    equals(a,b){
        const funcao=operadorObj.operador;
        this.realizar=operacoes[funcao];
        this.realizar(a,b);
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
    const tipo=this.dataset.tipo;
    const valor=this.dataset.value;

    //verifica se o calculo já está ok    
    
    if(operadorObj.statusOperacao&&(tipo==='op')){
        const operador= operadorObj.operador;     
        const realizaOperacao=operacoes[operador];
        const num1=operadorObj.getNum('num1');
        const num2=operadorObj.getNum('num2');
        realizaOperacao(num1,num2);
        operadorObj.setOperador=operador;

        return;
    }
    else if(operadorObj.statusOperacao&&(tipo==='eq')){
        const realizaOperacao=operacoes[valor];
        const num1=operadorObj.getNum('num1');
        const num2=operadorObj.getNum('num2');
        realizaOperacao(num1,num2);
        return;

    }
   

    else{

        if(tipo==='special'){
            let op=operacoes[valor];
            op();
            return;
        }

    //verifica se  o botao pressionado é de alguma operçaão matematica

        else if(tipo==='op'){
            if(operadorObj.lastUpdate==='operador'||operadorObj.lastUpdate==='num1'){
                operadorObj.setOperador=valor;
                return;
            }
            else return;        

        }

        else if(tipo==='num'){
            addLista(this.innerText);
            return;


        }


}
}


//função para adicionar a lista
function addLista(value){

    if(operadorObj.lastUpdate==='num1'||operadorObj.lastUpdate===''){
        const num=operadorObj.getNum('num1');
        if(num.length===8) return;
        let novo =num+value;
        operadorObj.setNum(novo,'num1');
        exibe(novo);
        return;   
    }

    else if(operadorObj.lastUpdate.num2==='num2'||operadorObj.lastUpdate==='operador'){
        const num=operadorObj.getNum('num2');
        if(num.length===8) return;
        let novo =num+value;
        operadorObj.setNum(novo,'num2');
        exibe(novo);
        return;
    }

    
}



