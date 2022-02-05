let fila=[];
const operacaoPermitida=['sum','multiply','subtract','divide'];
const operacaoEspecial=['clear','allClear','equals'];
const numPermitido=['0','1','2','3','4','5','6','7','8','9'];

//esta parte é responsável APENAS por ouvir os clicks e direcionar para a controller
$('.container__item--num').on('click',controller);


//declaração das funções
const operacoes= {
    sum(a,b){

        console.log('entrou na soma');
        let result=a+b;
        exibe(result);
        return;
    },
    
    subtract(a,b){   
        console.log('entrou na subtracao')
        let result=a-b;
        exibe(result);


        return;
    
    },
    
    multiply(a,b){
        console.log('entrou na multiplicacao')
        let result=a*b;
        exibe(result);

        return;
    
    },
    
    divide(a,b){
        console.log('entrou na divisao')
        let result=a/b;
        exibe(result);

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
        console.log(`entrou no equals com os valores a ${a}, b ${b}, c ${funcao}`);

        this.realizar=operacoes[funcao];
        this.realizar(a,b);

        for(let i =0;i<3;i++){
            console.log('retirando os valores já utilizados');
            fila.shift();
        }
        

        return;
        //define qual a operçaão que será realizada
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
    let num1='';
    let num2='';
    let operador='';


    //verifica se já podemos realizar o calculo
    if(fila[0]&&fila[1]&&fila[2]&&id!='equals'){
        console.log('ja temos os valores necessarios');
        console.log(`o id é ${id}`);
        const realizaOperacao=operacoes[id];
        const  result=realizaOperacao(parseInt(fila[0]),parseInt(fila[2]));
        console.log(result);
        
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


//função que identifica se o núemro inserido irá extrapolar o tamaho máximo de 8 caracteres

function maxSize(){



}


//criar uma classe  para os obvjetos na quqla ele terão o valor od  número e 



