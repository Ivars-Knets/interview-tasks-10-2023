

let toDoItemList = [
    {
        "id": 1,
        "name": "Take A Breath",
        "description": "Stop and take a moment to breath.",
        "isCompleted": 1
    },
    {
        "id": 2,
        "name": "Drink Water",
        "description": "Take a moment to drink some water.",
        "isCompleted": 0
    }   
];
function GetData(){    
    return toDoItemList;
}

//initial load
document.addEventListener("DOMContentLoaded", function(){
    RefreshList();
    HandelSetActionNew();    
});



function RefreshList(){
    const toDoArray = GetData();

    const todoList = document.getElementById("todoItemList");
    while( todoList.childNodes.length > 0 ){
        todoList.removeChild(todoList.childNodes[0]);
    }

    toDoArray.map( arrayElem => {
        HandleAddItem(arrayElem);
    });
    
    GenerateAddItemElement();
}

function HandelSetActionNew(){
    document.getElementById("todo-id").value = "new";
    document.getElementById("todo-action").value = "add";
    document.getElementById("todo-name").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-completed").checked = false;    
    document.getElementById("form-button-submit").textContent = "Add New Item";
    document.getElementById("form-button-remove").classList.add("hidden");
    
};

function HandleViewDetails(id){
    let itemBeingViewed = toDoItemList.find( findItem => findItem.id == id);
    document.getElementById("todo-id").value = itemBeingViewed.id;
    document.getElementById("todo-name").value = itemBeingViewed.name;
    document.getElementById("todo-description").value = itemBeingViewed.description;
    document.getElementById("todo-completed").checked = itemBeingViewed.isCompleted == 1;
    
    document.getElementById("todo-action").value = "update";
    document.getElementById("form-button-submit").textContent = "Update";
    document.getElementById("form-button-remove").classList.remove("hidden");
    document.getElementById("form-button-remove").setAttribute( "onclick", "HandleRemoveItem("+ itemBeingViewed.id +")" );
};



function HandleFormButtonClick(){
    const form_action = document.getElementById("todo-action").value;
    const newItem = {
        "id": document.getElementById("todo-id").value,
        "name": document.getElementById("todo-name").value,
        "description": document.getElementById("todo-description").value,
        "isCompleted": document.getElementById("todo-completed").checked ? 1 : 0
    };
    
    if( form_action === "add" ){
        RemoveElement("addNewItem");
        HandleAddItem(newItem);
        GenerateAddItemElement();
    } else if( form_action === "update" ) {        
        HandleUpdateItem(newItem);
    }

};

function GenerateAddItemElement(){
    const ul = document.getElementById("todoItemList");

    const newListItem = document.createElement("li");
    newListItem.classList.add("toDoListItem");
    newListItem.setAttribute( "id", "addNewItem" );
    newListItem.setAttribute( "onclick", "HandelSetActionNew()" );
    newListItem.setAttribute( "tabindex", 0 );

    const newListItemText = document.createElement("span");
    newListItemText.classList.add("newListItemText");
    newListItemText.textContent = "Add New Item";

    newListItem.appendChild(newListItemText);
    ul.appendChild(newListItem);
}

function RemoveElement(elemId){
    const elem = document.getElementById(elemId);
    if( elem ){
        elem.parentNode.removeChild(elem);
    }
}


function HandleAddItem(newItem){
    let currentId = 0;
    if( newItem.id == "new" ){
        const newId = toDoItemList.length + 1;
        currentId = newId;
        toDoItemList.push({
            "id": newId,
            "name": newItem.name,
            "description": newItem.description,
            "isCompleted": newItem.isCompleted
        })
    } else {
        currentId = newItem.id;
    } 

    const ul = document.getElementById("todoItemList");

    const newListItem = document.createElement("li");
    newListItem.classList.add("toDoListItem");
    newListItem.classList.add("dropzone");
    newListItem.setAttribute( "id", "todoItem-"+currentId );
    newListItem.setAttribute( "draggable", true );
    newListItem.setAttribute( "tabindex", currentId );
    if( newItem.isCompleted ){
        newListItem.classList.add("completed");
    }

    const newListItemDragIcon = document.createElement("span");
    newListItemDragIcon.classList.add("newListItemDragIcon");

    const newListItemText = document.createElement("span");
    newListItemText.classList.add("newListItemText");
    newListItemText.textContent = newItem.name;

    const newListItemDetailsButton = document.createElement("span");
    newListItemDetailsButton.classList.add("newListItemDetailsButton");
    newListItemDetailsButton.setAttribute( "onclick", "HandleViewDetails("+ currentId +")" );
    //newListItem.setAttribute( "tabindex", 0 );
    newListItemDetailsButton.textContent = "Details";

    newListItem.appendChild(newListItemDragIcon);
    newListItem.appendChild(newListItemText);
    newListItem.appendChild(newListItemDetailsButton);
    ul.appendChild(newListItem); 

    
    HandelSetActionNew();
};

function HandleUpdateItem(updatedItem){
    let newList = [];
    toDoItemList.map( listItem => {
        if( listItem.id === id ){
            newList.push(updatedItem);
        } else {
            newList.push(listItem);
        }
    });
    toDoItemList = newList;

    const elemToChange = document.getElementById("todoItem-"+ updatedItem.id);
    elemToChange.querySelector(".newListItemText").textContent = updatedItem.name;
    if( updatedItem.isCompleted ){
        elemToChange.classList.add("completed");
    }
};

function HandleRemoveItem(id){ 
    let newList = [];
    toDoItemList.map( listItem => {
        if( listItem.id !== id ){
            newList.push(listItem);
        }
    });

    toDoItemList = newList;

    RefreshList();
};




document.addEventListener("keyup", (event)=>{
    const activeElem = document.activeElement;

    switch( event.key){
        case "Enter":{
            if( 
                activeElem.className.split(" ").includes("toDoListItem") && 
                activeElem.className.split(" ").includes("dropzone") 
            ){
                HandleViewDetails(document.activeElement.id.split("-")[1]);
            } else if( activeElem.onclick != "" ){
                activeElem.onclick();
            }
            break;
        }
        default:{
            break;
        }
    }
});