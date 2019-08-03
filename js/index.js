// document.body.style.backgroundColor = "red";


// flag : start value of tools - empty/not chosen
let currentTool = "";

//collection of all tools
const toolsElements = document.querySelector('.tools');

Array.from(toolsElements.children).forEach(child => {

   child.addEventListener("click", () => {

     // if chosen the same tool - clear flag (make tool not chosen)
     if (currentTool === child.className) {
       currentTool = "";
       child.style.fontWeight = 'normal';
       document.body.style.cursor = 'default';
     }
     // else set name of class to flag
     else {
       if (currentTool !== "") {
         document.querySelector("." + currentTool).style.fontWeight = "normal";
         document.body.style.cursor = 'default';
       }
       currentTool = child.className;
       child.style.fontWeight = 'bold';

       if (currentTool === "paint-bucket") {
         document.body.style.cursor = "url(assets/img/barrel.png), cell";
       }
       if (currentTool === "choose-color") {
         document.body.style.cursor = "url(assets/img/pipette.png) 10 10, help";
       }
       if (currentTool === "move") {
         document.body.style.cursor = "url(assets/img/move.png), move";
       }
       if (currentTool === "transform") {
         document.body.style.cursor = "url(assets/img/transform.png), nesw-resize";
       }
     }
   })
 }
);

const canvasElements = document.querySelector('.canvas');

//move action (drag and drop)
const children = Array.from(canvasElements.children);

let dragSrcEl = null;

function handleDragStart(e) {

  if (currentTool === "move") {
    // this / e.target is the source node.
    this.style.opacity = '0.6';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
  } else {
    e.preventDefault();
  }
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.

  }
  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl !== this) {
    // Set the source column's HTML to the HTML of the column we dropped on.

    const temp = window.getComputedStyle(dragSrcEl).order;
    // e.srcElement.style.order = window.getComputedStyle(this).order;
    dragSrcEl.style.order = window.getComputedStyle(this).order;
    this.style.order = temp;
    dragSrcEl.style.opacity = '1';
  }
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  children.forEach.call(children, function (child) {
    child.classList.remove('over');
  });
}

children.forEach.call(children, (child) => {
  child.addEventListener('dragstart', handleDragStart, false);
  child.addEventListener('dragenter', handleDragEnter, false);
  child.addEventListener('dragover', handleDragOver, false);
  child.addEventListener('dragleave', handleDragLeave, false);
  child.addEventListener('drop', handleDrop, false);
  child.addEventListener('dragend', handleDragEnd, false);
});


//collection of all canvas elements
Array.from(canvasElements.children).forEach(child => {

  child.addEventListener("click", () => {

    // action if flag is on bucket
    if (currentTool === "paint-bucket") {
      child.style.background = window.getComputedStyle(document.querySelector('.current-color-item')).backgroundColor;


    }

    // action if flag is on transformation
    else if (currentTool === "transform") {

      if (child.style.borderRadius === "50%") {
        child.style.borderRadius = "0%";
      } else {
        child.style.borderRadius = "50%";
      }
    }

    // action if flag is on choose-color
    else if (currentTool === "choose-color") {

      document.body.addEventListener('click', function pip(event) {

        let flag = false;

        for (let i = 0; i < toolsElements.children.length; i++) {
          if (event.path.includes(toolsElements.children[i])) {
            document.body.removeEventListener('click', pip, true);
            flag = true;
          }
        }
        if (!flag) {
          const temp = window.getComputedStyle(document.querySelector('.current-color-item')).backgroundColor;
          document.querySelector('.current-color-item').style.background = window.getComputedStyle(event.target).backgroundColor;
          document.querySelector('.prev-color-item').style.background = temp;
          event.stopPropagation();
        }
      }, true);
    }
  });
});

// palette functional
document.querySelector('.red-color-item').addEventListener("click", setColor);
document.querySelector('.blue-color-item').addEventListener("click", setColor);
document.querySelector('.prev-color-item').addEventListener("click", setColor);

function setColor() {
  const temp = window.getComputedStyle(document.querySelector('.current-color-item')).backgroundColor;
  document.querySelector('.current-color-item').style.background = window.getComputedStyle(this).backgroundColor;
  document.querySelector('.prev-color-item').style.background = temp;
}

//actions for tools for keyboard
addEventListener("keydown", function (event) {

  if (currentTool !== "") {
    document.querySelector("." + currentTool).style.fontWeight = "normal";
    document.body.style.cursor = 'default';
  }

  if (event.code === "KeyM") {

    if (currentTool === "move") {
      currentTool = "";
      document.querySelector('.move').style.fontWeight = 'normal';
      document.body.style.cursor = 'default';
    } else {
      currentTool = "move";
      document.querySelector('.move').style.fontWeight = 'bold';
      document.body.style.cursor = "url(assets/img/move.png), move";
    }
  }

  if (event.code === "KeyT") {

    if (currentTool === "transform") {
      currentTool = "";
      document.querySelector('.transform').style.fontWeight = 'normal';
      document.body.style.cursor = 'default';
    } else {
      currentTool = "transform";
      document.querySelector('.transform').style.fontWeight = 'bold';
      document.body.style.cursor = "url(assets/img/transform.png), nesw-resize";
    }
  }

  if (event.code === "KeyP") {

    if (currentTool === "paint-bucket") {
      currentTool = "";
      document.querySelector('.paint-bucket').style.fontWeight = 'normal';
      document.body.style.cursor = 'default';
    } else {
      currentTool = "paint-bucket";
      document.querySelector('.paint-bucket').style.fontWeight = 'bold';
      document.body.style.cursor = "url(assets/img/barrel.png), cell";
    }
  }

  if (event.code === "KeyC") {

    if (currentTool === "choose-color") {
      currentTool = "";
      document.querySelector('.choose-color').style.fontWeight = 'normal';
      document.body.style.cursor = 'default';
    } else {
      currentTool = "choose-color";
      document.querySelector('.choose-color').style.fontWeight = 'bold';
      document.body.style.cursor = "url(assets/img/pipette.png) 10 10, help";
    }
  }
});


//LocalStorage

Array.from(canvasElements.children).forEach(child => {

  child.addEventListener("click", () => {


    localStorage.setItem('color', 'child.style.background');
    window.onload = () => {
      if (localStorage.getItem('color') !== null) {
        child.style.background = localStorage.getItem('color');
      }
    }

  })
});
