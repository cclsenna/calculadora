const operacao=[];

//coloca o evetlisetener nos numeros
$('.container__item--num').on('click',(e)=>{
    const valor=e.target.innerText;
    const id=e.target.id;  


    //console.log(`Pegou o valor ${e.target.innerText}`);
    //console.log('o id desse cara é : '+id);
    addLista(e.target.innerText);

    
}
);



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
        operacao=[];
    },
    allClear(){
        operacao=[];

    }
    

}






//essa função irá manipular o array da fila
function controller(){


}

function addLista(value){
    operacao.push(value);
    console.log(`adicionando o ${value} na fila de execução`);
    console.log(operacao);
}

//criar uma classe  para os obvjetos na quqla ele terão o valor od  número e 



