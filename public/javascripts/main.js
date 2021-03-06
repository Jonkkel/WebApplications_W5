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

    fetch("http://localhost:1234/recipe/start")
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
    var diets = [];
    var checkBoxParent = document.getElementById("checkBoxs");
    fetch("http://localhost:1234/recipe/")
        .then((response) => response.json())
        .then((data) => {
            for (var i = 0; i< data.length; i++){
                diets = data;
                console.log(data[i].name);
                var p = document.createElement("p");
                var label = document.createElement("label");
                var input = document.createElement("input");
                input.classList ="filled-in";
                input.type ="checkbox";
                input.id = data[i].name;
                var span = document.createElement("span");
                span.innerHTML = data[i].name;
                p.appendChild(label);
                label.appendChild(input);
                label.appendChild(span);
                checkBoxParent.appendChild(p)
            }});
    
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

    

    submitButton.addEventListener("click", async function() {
        const text = document.getElementById("name-text");
        var veganBox = null;
        var ovoBox = null; 
        var glutenBox = null; 
        if (diets.length != 0){
            console.log(diets[0].name);
            veganBox = document.getElementById(diets[0].name);
            ovoBox = document.getElementById(diets[1].name);
            glutenBox = document.getElementById(diets[2].name);
        }
        const catego = [];
        const image = [];
        if(veganBox != null && veganBox.checked){
            catego.push(diets[0]._id);
        }
        if(ovoBox != null && ovoBox.checked){
            catego.push(diets[1]._id);
        }
        if(glutenBox != null && glutenBox.checked){
            catego.push(diets[2]._id);
        }

        console.log(catego);
        const data = { name: text.value, ingredients: ingre_list, instructions: instru_list, categories: catego, images: image}
        await fetch("http://localhost:1234/recipe/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
            })
            if (catego.length != 0){
                veganBox.checked = false;
                ovoBox.checked = false;
                glutenBox.checked = false;
            }
            catego.length = 0;
        
        const formData = new FormData();
        const fileField = document.getElementById("camera-file-input");
    
        for(var i = 0; i < fileField.files.length;i++){
            formData.append("image",fileField.files[i])
        }
        formData.append("name", text.value);
        text.value ="";
        fetch('http://localhost:1234/images', {
            method: 'POST',
            body: formData,
          })
        }
    );
    const sBar = document.getElementById('searchBar');
    sBar.addEventListener('keydown', function onEvent(event) {
        
        if (event.key === "Enter") {
            fetchData(sBar.value);
            ingre_list.length = 0;
            instru_list.length = 0;
            sBar.value = "";
        }
    });

};

function addToList(parent, value){
    var ing = document.createElement("li");
    ing.innerHTML = value;
    parent.appendChild(ing);
}

function fetchData(food){
    var header = document.getElementById("title");
    var ing_parent = document.getElementById("ingredients");
    var ins_parent = document.getElementById("instructions");
    ing_parent.innerHTML = '';
    ins_parent.innerHTML = '';
    fetch("http://localhost:1234/recipe/"+food)
    .then((response) => response.json())
    .then((data) => (
        header.innerHTML = data[0].name,
        data[0].ingredients.forEach(element => {
            addToList(ing_parent, element);
        }),
        data[0].instructions.forEach(element => {
            addToList(ins_parent, element);
        })
        ));
    
}
