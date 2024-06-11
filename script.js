// Define all DOM elements used in the script
const elements = {
  nameInput: document.getElementById("name-input"),
  imageInput: document.getElementById("image-input"),
  userNameSpan: document.getElementById("user-name"),
  profileImage: document.getElementById("profile-image"),
  submitBtn: document.getElementById("submit-btn"),
  userInputs: document.getElementById("user-inputs"),
  container: document.getElementById("container"),
  taskContainer: document.getElementById("tasks-container"),
  addTaskContainer: document.getElementById("add-task-container"),
  taskInput: document.getElementById("task-input"),
  addTask: document.getElementById("add"),
  taskNum: document.getElementById("tasks-number"),
  taskS: document.getElementById("s"),
  show: document.getElementById("showAdd").querySelector("ion-icon"),
  navItems: document.querySelectorAll(".bottom-navbar .nav-item"),
};

// Function to show home elements
function showHome() {
  elements.container.style.display = "block";
  elements.taskContainer.style.display = "block";
  elements.container.style.opacity = 1;
  elements.taskContainer.style.opacity = 1;
  elements.container.style.transform = "scale(1)";
  elements.taskContainer.style.transform = "scale(1)";
  elements.userInputs.style.display = "none";
}

// Function to hide home elements
function hideHome() {
  elements.container.style.opacity = 0;
  elements.taskContainer.style.opacity = 0;
  elements.container.style.transform = "scale(0.95)";
  elements.taskContainer.style.transform = "scale(0.95)";
  elements.userInputs.style.display = "block";
  setTimeout(() => {
    elements.userInputs.style.opacity = 1;
    elements.userInputs.style.transform = "scale(1)";
  }, 30);
}

// Function to update navigation bar with user's name and image
function updateNav(name, image) {
  localStorage.setItem("userName", name);
  localStorage.setItem("profileImage", image);
  elements.userNameSpan.textContent = name;
  elements.profileImage.src = image;
}

// Function to load navigation bar with stored user data or defaults
function loadNav() {
  const name = localStorage.getItem("userName") || "Wael";
  const image = localStorage.getItem("profileImage") || "default-profile.jpg";
  updateNav(name, image);
  if (name && image) showHome();
}

// Load navigation bar data on page load
loadNav();

// Event listener for name input changes
elements.nameInput.addEventListener("input", () => {
  updateNav(
    elements.nameInput.value.trim() || "Wael",
    elements.profileImage.src
  );
});

// Event listener for image input changes
elements.imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateNav(elements.userNameSpan.textContent, e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Event listener for submit button click
elements.submitBtn.addEventListener("click", () => {
  updateNav(
    elements.nameInput.value.trim() || "Wael",
    elements.profileImage.src || "default-profile.jpg"
  );
  showHome();
});

// Event listener for profile image click
elements.profileImage.addEventListener("click", hideHome);
elements.userNameSpan.addEventListener("click", hideHome);

// Event listener for add icon click
elements.show.addEventListener("click", () => {
  if (elements.addTaskContainer.style.display === "none") {
    showAdd();
    elements.show.setAttribute("name", "close-circle");
    elements.show.parentElement.classList.add("active");
    elements.navItems.forEach((item) => {
      if (item !== elements.show.parentElement) {
        item.classList.remove("active");
        const icon = item.querySelector("ion-icon");
        icon.setAttribute(
          "name",
          icon.getAttribute("name").replace("-outline", "") + "-outline"
        );
      }
    });
  } else {
    hideAdd();
  }
});

// Function to show additional task container
function showAdd() {
  elements.addTaskContainer.style.display = "block";
  elements.addTaskContainer.style.transform = "scale(1)";
  elements.taskContainer.style.display = "none";
}

// Function to hide additional task container
function hideAdd() {
  elements.addTaskContainer.style.display = "none";
  elements.addTaskContainer.style.transform = "scale(0.85)";
  elements.taskContainer.style.display = "block";
  elements.show.setAttribute("name", "add-circle-outline");
  elements.show.parentElement.classList.remove("active");
  const homeNavItem = document.getElementById("home");
  homeNavItem.classList.add("active");
  const homeIcon = homeNavItem.querySelector("ion-icon");
  homeIcon.setAttribute("name",homeIcon.getAttribute("name").replace("-outline", ""));
}


// Function to add task

let taskNum = 0;

const addTask = () => {
  if (elements.taskInput.value !== "") {
    elements.taskContainer.innerHTML += `<div id="task" class="task">
                <a href="#" id="to-check-list" class="check">
                    <ion-icon name="ellipse-outline"></ion-icon>
                </a>
                <h1 class="task-content">${elements.taskInput.value}</h1>
                <a href="#" id="to-trash" class="trash">
                    <ion-icon name="trash-outline"></ion-icon>
                </a>
            </div>`;
    elements.taskInput.value = "";
    taskNum = taskNum + 1;
    elements.taskNum.innerText = taskNum;
    if (taskNum > 1) {
      elements.taskS.innerText = "s";
    } else {
      elements.taskS.innerText = "";
    }
  } else {
    alert("You should write your task first");
  }
};

// Change it
elements.taskContainer.addEventListener('click', (event) => {
  if (event.target.closest('.check')) {
    // Handle check event
    console.log('Task checked');
  } else if (event.target.closest('.trash')) {
    // Handle trash event
    const task = event.target.closest('.task');
    task.remove();
    console.log('Task removed');
    taskNum = taskNum - 1;
    elements.taskNum.innerText = taskNum;
    if (taskNum > 1) {
      elements.taskS.innerText = "s";
    } else {
      elements.taskS.innerText = "";
    }
  }
});

// Add button
elements.addTask.addEventListener('click', addTask);

// Enter key
elements.taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});


// Custom Alert

// Function to set initial state of navigation icons
function setInitialIconState() {
  elements.navItems.forEach((item) => {
    const icon = item.querySelector("ion-icon");
    if (!item.classList.contains("add")) {
      if (item.classList.contains("active")) {
        icon.setAttribute("name",icon.getAttribute("name").replace("-outline", "")
        );
      } else {
        icon.setAttribute(
          "name",
          icon.getAttribute("name").replace("-outline", "") + "-outline"
        );
      }
    }
  });
}

// Set initial state of navigation icons on DOM content load
document.addEventListener("DOMContentLoaded", setInitialIconState);

// Event listeners for navigation items
elements.navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("add")) {
      elements.navItems.forEach((navItem) => {
        if (navItem !== item && !navItem.classList.contains("add")) {
          const icon = navItem.querySelector("ion-icon");
          navItem.classList.remove("active");
          icon.setAttribute(
            "name",
            icon.getAttribute("name").replace("-outline", "") + "-outline"
          );
        }
      });

      const icon = item.querySelector("ion-icon");
      item.classList.add("active");
      icon.setAttribute(
        "name",
        icon.getAttribute("name").replace("-outline", "")
      );
    }
  });
});
