const nameInput = document.getElementById('name-input');
const imageInput = document.getElementById('image-input');
const userNameSpan = document.getElementById('user-name');
const profileImage = document.getElementById('profile-image');
const submitBtn = document.getElementById('submit-btn');
const userInputs = document.getElementById('user-inputs');
const container = document.getElementById('container');

function showProfile() {
  container.style.display = 'block';
  container.style.opacity = 1;
  container.style.transform = 'scale(1)';
  userInputs.style.display = 'none';
}

function hideProfile() {
  container.style.opacity = 0;
  container.style.transform = 'scale(0.95)';
  userInputs.style.display = 'block';
  setTimeout(() => {
    userInputs.style.opacity = 1;
    userInputs.style.transform = 'scale(1)';
  }, 10);
}

function updateProfile(name, image) {
  localStorage.setItem('userName', name);
  localStorage.setItem('profileImage', image);
  userNameSpan.textContent = name;
  profileImage.src = image;
}
  
function loadProfile() {
  const name = localStorage.getItem('userName') || 'Wael';
  const image = localStorage.getItem('profileImage') || 'default-profile.jpg';
  updateProfile(name, image);
  if (name && image) {
    showProfile();
  }
}

loadProfile();
nameInput.addEventListener('input', function () {
  updateProfile(nameInput.value.trim() || 'Wael', profileImage.src);
});

imageInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      updateProfile(userNameSpan.textContent, e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

submitBtn.addEventListener('click', function () {
  updateProfile(nameInput.value.trim() || 'Wael', profileImage.src || 'default-profile.jpg');
  showProfile();
});

profileImage.addEventListener('click', hideProfile);
userNameSpan.addEventListener('click', hideProfile);