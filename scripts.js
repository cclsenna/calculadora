let fila=[];
const operacaoPermitida=['sum','multiply','subtract','divide'];
const operacaoEspecial=['clear','allClear','equals'];
const numPermitido=['0','1','2','3','4','5','6','7','8','9'];

//esta parte é responsável APENAS por ouvir os clicks e direcionar para a controller
$('.container__item--num').on('click',controller);


//declaração das funções
const operacoes= {
    sum(a,b){
        return a+b;
    },
    
    subtract(a,b){   
        return a-b;
    
    },
    
    multiply(a,b){
        return a*b;
    
    },
    
    divide(a,b){
        return a/b;
    
    },
    clear(){
        //deve limpar apenas o numero atual da tela
        $('#value').text('0');
        return;
    },
    allClear(){
        // console.log('limpando o valor da tela e fila')

        fila=[];
        $('#value').text('0');



    }
    
}

//função utilizad para exibir os valores na tabela
function exibe(numExibicao){

    $('#value').text(numExibicao);

}


//essa função irá manipular o array da fila
function controller(){
    const id=this.id;
    let num1=0;
    let num2=0;
    let operador='';



    if(num1&&num2&&operador){
        console.log

    }



    else{

    //verifica se o botão pressioando é de alguma oepraçõ que precisa ser feita instantaneament
    if(operacaoEspecial.indexOf(id)>-1&&fila){
        console.log('operacao especial ativada');
        let op=operacoes[id];
        op();
        return;        
    }


    //verifica se  o botao pressionado é de alguma op matematica
    else if(operacaoPermitida.indexOf(id)>-1&&!fila){
        console.log('operacao permitida ativada');
        if(operacaoPermitida.indexOf(fila[fila.length-1])>-1){
            console.log('o operador já existe,substituindo pelo novo');
            fila[fila.length-1]=this.id;
            console.log(fila);
        }
        else{            
            addLista(this.id);

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
 
/*
    if(operacaoPermitida.indexOf(id)>-1){
        console.log('operacao permitida');
        return;
    }

    */
    
    //console.log(`Pegou o valor ${e.target.innerText}`);
    //console.log('o id desse cara é : '+id);

}


function addLista(value){
    //inserir regra de negocio aqui para tratar o cenario em que o usuario aperta apenas botões de operações.nesse caso devo considerar só a ultima.
    //um vetor 


    if(parseInt(fila[fila.length-1])){
        fila[fila.length-1]+=value; 
        exibe(fila[fila.length-1]);
        console.log(fila);
        return;
    }


    fila.push(value);
    exibe(value);
    console.log(fila);
}


//irei utilizar essa func para exibir o claculo anterior na tela
function lastOperation(){


}

//criar uma classe  para os obvjetos na quqla ele terão o valor od  número e 



