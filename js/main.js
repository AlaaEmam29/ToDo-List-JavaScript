"use strict";

let inputGetData = document.getElementById('inputGetData'),
    addBtn = document.getElementById('addBtn'),
    editBtn = document.getElementById('editBtn'),
    showToDoList = document.getElementById('todoList'),
    clearAllData = document.getElementById('clearAllData'),
    pendingTasks = document.getElementById('pendingTasks'),
    toDoList,currentIndex;

toDoList = [];
currentIndex = 0;
if(localStorage.getItem('toDoList') != null)
{
    toDoList =  getItemIntoLocalStorage();
    displayData();
}
addBtn.addEventListener('click',function ()
    {
if(!checkEmpty())
{
    addData();
    resetData();
    displayData();

}

        }
)

function addData() {
    let singleToDo =
        {
            data:inputGetData.value
        }

    toDoList.push(singleToDo);
    setItemIntoLocalStorage();


}
function resetData()
{
    inputGetData.value = "";
    addBtn.disabled = true;
    editBtn.disabled = true;

}
function displayData()
{

let container = '';
toDoList.forEach((task,index)=>
    {
        container +=  `<li onclick="getDataFomTable(${index})">${task.data}<span onclick="deleteDataFomTable(${index})" class="icon"><i class="fas fa-trash"></i></span></li>`
    }
)
    showToDoList.innerHTML = container;
pendingTasks.innerHTML = toDoList.length;
}
function setItemIntoLocalStorage()
{
    return localStorage.setItem('toDoList',JSON.stringify(toDoList));
}
function getItemIntoLocalStorage()
{
    return JSON.parse(localStorage.getItem('toDoList'));
}
clearAllData.addEventListener('click',function ()
    {
        clearAll();
    }
)
function clearAll()
{
    toDoList = [];
    setItemIntoLocalStorage();
    displayData();
}
function deleteDataFomTable(index)
{
  toDoList.splice(index,1);
    setItemIntoLocalStorage();
    displayData();

}
function checkEmpty() {
    if(inputGetData.value === '')
    {
        addBtn.disabled = true;
        editBtn.disabled = true;

        return true;
    }
    else
    {
        addBtn.disabled = false;
        editBtn.disabled = false;

        return false;
    }
}
function getDataFomTable(index)
{
    inputGetData.value = toDoList[index].data;
    currentIndex = index;
}
function updateData() {
    let singleToDo =
        {
            data:inputGetData.value
        }

    toDoList[currentIndex] = singleToDo ;
    setItemIntoLocalStorage();

}
editBtn.addEventListener('click',function ()
{
if(!checkEmpty())
{
    updateData();
    displayData();
    resetData();

}
})


inputGetData.addEventListener('keyup',function ()
{

   if(inputGetData.value != '')
   {
       addBtn.disabled = false;
       editBtn.disabled = false;
   }

})

