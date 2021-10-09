if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    const options = {
        edge: 'right',
        draggable: false,
        inDuration: 250,
        outDuration: 200,
        onOpenStart: null,
        onOpenEnd: null,
        onCloseStart: null,
        onCloseEnd: null,
        preventScrolling: true
    };
    var header = document.getElementById("title");
    var ing_list = document.getElementById("ingredients");
    var ins_list = document.getElementById("instructions");

    fetch("http://localhost:1234/recipe/porridge")
        .then((response) => response.json())
        .then((data) => (header.innerHTML = data.name,
            data.ingredients.forEach(element => {
                var ing = document.createElement("li");
                ing.innerHTML = element;
                ing_list.appendChild(ing);
            }),
            data.instructions.forEach(element => {
                var ins = document.createElement("li");
                ins.innerHTML = element;
                ins_list.appendChild(ins);
            })
        ));
    
    const ingre_list = [];
    const instru_list = [];
    const addIngButton = document.getElementById("add-ingredient");
    const addInsButton = document.getElementById("add-instruction");
    const submitButton = document.getElementById("submit");
    
    addIngButton.addEventListener("click", function() {
        const ingredient = document.getElementById("ingredients-text");
        ingre_list.push(ingredient.value);
        ingredient.value ="";
    });

    addInsButton.addEventListener("click", function() {
        const instruction = document.getElementById("instructions-text");
        instru_list.push(instruction.value);
        instruction.value ="";
    });

    submitButton.addEventListener("click", function() {
        const text = document.getElementById("name-text");
        const data = { name: text.value, ingredients: ingre_list, instructions: instru_list}

        ing_list.innerHTML = '';
        ins_list.innerHTML = '';
        fetch("http://localhost:1234/recipe/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then((data) => (header.innerHTML = data.name,
            data.ingredients.forEach(element => {
                addToList(ing_list, element);
            }),
            data.instructions.forEach(element => {
                addToList(ins_list, element);
            })
        ));
        ingre_list.length = 0;
        instru_list.length = 0;
        text.value = "";
        
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
    
        for(var i = 0; i < fileField.files.length;i++){
            formData.append("images",fileField.files[i])
        }
        
        fetch('http://localhost:1234/images', {
            method: 'POST',
            body: formData,
          })
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
    );
};

function addToList(parent, value){
    var ing = document.createElement("li");
    ing.innerHTML = value;
    parent.appendChild(ing);
}