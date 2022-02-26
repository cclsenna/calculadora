let fila=[];
const operacaoPermitida=['sum','multiply','subtract','divide'];
const operacaoEspecial=['clear','allClear','equals'];
const numPermitido=['0','1','2','3','4','5','6','7','8','9'];

//esta parte é responsável APENAS por ouvir os clicks e direcionar para a controller
$('.container__item--num').on('click',controller);

const operadorObj={
    num1: 0,
    num2: 0,
    op : ''



}


//declaração das funções
const operacoes= {
    sum(a,b){
        let result=a+b;
        exibe(result);
        fila.unshift(result);
        return;
    },
    
    subtract(a,b){   
        let result=a-b;
        console.log(result);
        exibe(result);
        fila.unshift(result);
        return;
    
    },
    
    multiply(a,b){
        let result=a*b;
        exibe(result);
        fila.unshift(result);
        return;
    
    },
    
    divide(a,b){
        let result=a/b;
        exibe(result);
        fila.unshift(result);
        return;
    
    },

    clear(){
        fila=[];
        $('#value').text('0');
        return;
    },
    allClear(){
        fila=[];
        $('#value').text('0');



    },
    equals(a,b,funcao){
        this.realizar=operacoes[funcao];
        //retira os valores da conta a ser utilizada
        for(let i =0;i<3;i++){
            fila.shift();
        }
        this.realizar(a,b);  
        
        return;
    }
    
}

//função utilizad para exibir os valores na tabela
function exibe(numExibicao){
    let doc=document.querySelector('#value');
    doc.innerText=numExibicao;
    doc.style.display='none';
    setTimeout(()=>{doc.style.display='block';
},50)
    
    


}

//essa função irá manipular o array da fila
function controller(){
    const id=this.id;    


    //verifica se já podemos realizar o calculo
    if(fila[0]&&fila[1]&&fila[2]&&id!='equals'&&id){
        console.log('ja temos os valores necessarios');
        const realizaOperacao=operacoes[id];
        const  result=realizaOperacao(parseInt(fila[0]),parseInt(fila[2]));
        return;
    }

    else if(fila[0]&&fila[1]&&fila[2]&&id==='equals'){
        const realizaOperacao=operacoes[id];
        const  result=realizaOperacao(parseInt(fila[0]),parseInt(fila[2]),fila[1]);
        return;

    }



    else{

    //verifica se o botão pressioando é de alguma operação que precisa ser feita instantaneamente
    if(operacaoEspecial.indexOf(id)>-1&&fila){
        console.log('operacao especial ativada');
        let op=operacoes[id];
        op();
        return;        
    }


    //verifica se  o botao pressionado é de alguma operçaão matematica
    else if(operacaoPermitida.indexOf(id)>-1&&fila){
        console.log('operacao permitida ativada');
        if(operacaoPermitida.indexOf(fila[fila.length-1])>-1){
            console.log('o operador já existe,substituindo pelo novo');
            fila[fila.length-1]=this.id;
            console.log(fila);
        }
        else{            
            addLista(this);

        }
        operador=this.id;
        return;
    }

    //else para os casos de numeros normais
    else if(numPermitido.indexOf(this.innerText)>-1){
        console.log('numero comum');
        addLista(this.innerText);
        return;

    }
    else return;
}

console.log(fila);
 
}


function addLista(value){

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

//esta função será responsável por identificar qual o tipo de botão que foi pressionado
function buttonPressed(){

    return;


}




