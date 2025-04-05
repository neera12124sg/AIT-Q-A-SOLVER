console.log("MIT AOE Solver Loaded!");

function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('collapsed');
}

function showSection(sectionId) {
  document.getElementById('askDoubtSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';
  document.getElementById('answerSection').style.display = 'none';
  document.getElementById(sectionId).style.display = 'block';

  document.getElementById('subjectList').style.display = 'none';
  document.getElementById('questionForm').style.display = 'none';
}

showSection('askDoubtSection');

document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const form = document.getElementById('questionForm');
  const isVisible = list.style.display === 'block';
  list.style.display = isVisible ? 'none' : 'block';
  form.style.display = 'none';
});

const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('questionForm').style.display = 'block';
  });
});

function submitQuestion() {
  const question = document.getElementById('questionInput').value.trim();
  const imageFile = document.getElementById('imageUpload').files[0];
  const prefAI = document.getElementById('prefAI').checked;
  const prefTeacher = document.getElementById('prefTeacher').checked;
  const prefPeers = document.getElementById('prefPeers').checked;

  if (!question) {
    alert("Please enter your question.");
    return;
  }

  showSection('answerSection');

  document.getElementById('displayedQuestion').textContent = question;

  const imagePreviewBox = document.getElementById('imagePreviewBox');
  const displayedImage = document.getElementById('displayedImage');
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      displayedImage.src = e.target.result;
      imagePreviewBox.style.display = 'block';
    };
    reader.readAsDataURL(imageFile);
  } else {
    imagePreviewBox.style.display = 'none';
  }

  document.getElementById('answersContainer').style.display = 'none';
  document.getElementById('toggleAnswerCommentsBtn').style.display = 'block';

  document.getElementById('toggleAnswerCommentsBtn').onclick = function () {
    document.getElementById('answersContainer').style.display = 'block';
    document.getElementById('toggleAnswerCommentsBtn').style.display = 'none';

    document.getElementById('aiAnswer').style.display = prefAI ? 'block' : 'none';
    document.getElementById('teacherAnswer').style.display = prefTeacher ? 'block' : 'none';
    document.getElementById('peersAnswer').style.display = prefPeers ? 'block' : 'none';
  };

  document.getElementById('questionInput').value = '';
  document.getElementById('imageUpload').value = '';
  document.getElementById('prefAI').checked = false;
  document.getElementById('prefTeacher').checked = false;
  document.getElementById('prefPeers').checked = false;

  console.log("Question Submitted:", question);
}
