document.querySelector('#tab0').style.color = 'blue';

function resetTab() {
    for(let i=0;i<5;++i) {
        document.querySelector('#tab'+String(i)).style.color = 'black';
    }
}

document.querySelector('#tab0').onclick = ()=>{
    resetTab();
    document.querySelector('#tab0').style.color = 'blue';
    document.querySelector('#page').src = 'ex0/ex0.html';
};

document.querySelector('#tab1').onclick = ()=>{
    resetTab();
    document.querySelector('#tab1').style.color = 'blue';
    document.querySelector('#page').src = 'ex1/ex1.html';
};

document.querySelector('#tab2').onclick = ()=>{
    resetTab();
    document.querySelector('#tab2').style.color = 'blue';
    document.querySelector('#page').src = 'ex2/ex2.html';
};

document.querySelector('#tab3').onclick = ()=>{
    resetTab();
    document.querySelector('#tab3').style.color = 'blue';
    document.querySelector('#page').src = 'ex3/ex3.html';
};

document.querySelector('#tab4').onclick = ()=>{
    resetTab();
    document.querySelector('#tab4').style.color = 'blue';
    document.querySelector('#page').src = 'ex4/ex4.html';
};
