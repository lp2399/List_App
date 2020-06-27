const form  = document.querySelector('#task-form');
const taskList = document.querySelector('.task-list');
const clearTaskButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const inputField = document.querySelector('#input-field');
const buttonOpen = document.querySelector('#button-open');
const buttonClose = document.querySelector('#exit');
initiateEventListeners();
function initiateEventListeners(){
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click', removeTask);
    clearTaskButton.addEventListener('click', clearTasks);
    filter.addEventListener('keyup',filterTasks);
    checkOff();
    fadeEffect();
    dragListItems();
}
function addTask(e){
    if(!inputField.value|| inputField.value.length===0){
        e.preventDefault();
        return;
    }else{
const li = document.createElement('li');
li.className = 'list-item draggable';
li.setAttribute('draggable','true')
li.appendChild(document.createTextNode(inputField.value));
const link =document.createElement('a');
link.className = 'delete-item';
link.innerHTML = ' <i class =" fas fa-trash-alt hide"></li> ';
li.appendChild(link);
taskList.appendChild(li);
inputField.value='';
e.preventDefault();
}initiateEventListeners();
};
checkOff();
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      e.target.parentElement.parentElement.remove();
    }
    checkOff();
}

function clearTasks(e){
let clearTaskModal = document.querySelector('#clearTasks-action');
let confirm = document.querySelector('#confirm');
let cancel = document.querySelector('#cancel');
clearTaskModal.style.display ="block";
e.preventDefault();
container.style.display='none';
confirm.addEventListener('click', function(e){
      while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };
    clearTaskModal.style.display ="none";
    container.style.display='block';
    return;
})

cancel.addEventListener('click',function(){
    clearTaskModal.style.display ="none";
    container.style.display='block';
    return;
})   
};
function filterTasks(e){
    const text = e.target.value.toLowerCase();
document.querySelectorAll('.list-item').forEach
(function(task){
    let item = task.firstChild.textContent;
if(item.toLowerCase().indexOf(text)!=-1){
    task.style.display = 'block';
}else{
    task.style.display = 'none';
}
});
}
function checkOff(){
    let listItem = document.querySelectorAll('.list-item');
for(let i=0; i<listItem.length;i++){
    listItem[i].addEventListener('click',function(){
        this.classList.toggle('completed');
    });
};
};
const container = document.querySelector('.container');
const move = document.querySelector('#move');
move.addEventListener('mousedown', mouseDown);
// functionality from https://www.w3schools.com/howto/howto_js_draggable.asp
 function mouseDown(e){
   if(e.target!=move){
       return;
   };
    window.addEventListener('mousemove',mouseMoveX);
    window.addEventListener('mousemove',mouseMoveY);
    window.addEventListener('mouseup', mouseUp);
    let position1 = 0, position2 = 0, position3 = 0, position4 = 0;
    position3 = e.clientX;
    position4 = e.clientY;
    function mouseMoveX(e){
       position1 = position3 - e.clientX;
       container.style.left = (container.offsetLeft - position1) + "px";
       position3 = e.clientX;
     } function mouseMoveY(e){
        position2 = position4 - e.clientY;
        container.style.top = (container.offsetTop -position2) + "px";
        position4 = e.clientY;
        }
     function mouseUp(){
        window.removeEventListener('mousemove',mouseMoveX);
        window.removeEventListener('mousemove',mouseMoveY);
        window.removeEventListener('mouseup', mouseUp);
        initiateEventListeners(); 
     };   
 };
 buttonOpen.addEventListener('click',function(){
    container.style.display='block';
});
buttonClose.addEventListener('click',function(){
   container.style.display='none';
});
function fadeEffect(){
    let listItem = document.querySelectorAll('.list-item'),
 removeIcon = document.querySelectorAll('.fa-trash-alt');
    for(let i = 0; i<listItem.length;i++){
    listItem[i].addEventListener('mouseenter',function(){
        setTimeout(function(){
              removeIcon[i].classList.remove('hide');
     removeIcon[i].classList.add('show');
        },200);
   
    });
    listItem[i].addEventListener('mouseleave',function(){
        setTimeout(function(){
            removeIcon[i].classList.add('hide');
        },200);
            
     });
}
};
function dragListItems(){
    // functionality from Stack Overflow https://stackoverflow.com/questions/10588607/tutorial-for-html5-dragdrop-sortable-list
    let selected = null
let listItem = document.querySelectorAll('.list-item');

for(let i = 0; i<listItem.length;i++){
listItem[i].addEventListener('dragover',function(e){
 if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target);
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling);
  }
})
listItem[i].addEventListener('dragstart',function(e){
     e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', null)
  selected = e.target;
})
listItem[i].addEventListener('dragend',function(){
     selected = null;
});
};
function isBefore(el1, el2) {
  let current;
  if (el2.parentNode === el1.parentNode) {
    for (current = el1.previousSibling; current; current = current.previousSibling) {
      if (current === el2) return true;
    }
  }
  return false;
}
};
