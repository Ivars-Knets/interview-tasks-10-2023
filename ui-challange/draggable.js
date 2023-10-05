/**
 * adapted form - https://stackoverflow.com/questions/12332403/html5-ul-li-draggable (second answer)
*/

let dragged;
let id;
let index;
let indexDrop;
let list;

document.addEventListener("dragstart", ({target})=>{
    dragged = target;
    id = target.id;
    list = target.parentNode.children;

    for( let i=0; i<list.length; i++ ){
        if( list[i] === dragged ){
            index = i;
        } 
    };
    
});

document.addEventListener("dragover", (event)=>{
    event.preventDefault();
    /*
    const targetClasses = event.target.className.split(" ");
    if( !targetClasses.includes("draggingOver") ){
        event.target.classList.add("draggingOver");
    }
    */
});

document.addEventListener("drop", ({target})=>{
    let actualTarget = target;
    let targetClassNames = target.className.split(" ");

    //get parent node, if target is on of the <li/> children
    if( 
        targetClassNames.includes("newListItemDragIcon") || 
        targetClassNames.includes("newListItemText") || 
        targetClassNames.includes("newListItemDetailsButton") 
    ){
        actualTarget = target.parentNode;
        targetClassNames = target.parentNode.className;
    }
    

    if( targetClassNames.includes("dropzone") && actualTarget.id !== id ){
        dragged.remove();
        
        for( let i=0; i<list.length; i++ ){
            //list[i].classList.remove("draggingOver");
            if( list[i] === actualTarget ){
                indexDrop = "todoItem-"+ i;
            } 
        };

        if( index > indexDrop ){
            actualTarget.before( dragged );
        } else {
            actualTarget.after( dragged );
        }
    }
});