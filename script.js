console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const form = document.getElementById('questionForm');
  const isVisible = list.style.display === 'block';
  list.style.display = isVisible ? 'none' : 'block';
  // Hide the question form when toggling the subject list
  form.style.display = 'none';
});

// Show question form when any subject is clicked
function showQuestionForm() {
  document.getElementById('questionForm').style.display = 'block';
}
const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', showQuestionForm);
});

// Function to show the selected section and hide others
function showSection(sectionId) {
  const askSection = document.getElementById('askDoubtSection');
  const contactSection = document.getElementById('contactSection');
  const answerSection = document.getElementById('answerSection');

  if (sectionId === 'askDoubtSection') {
    askSection.style.display = 'block';
    contactSection.style.display = 'none';
    answerSection.style.display = 'none';
  } else {
    askSection.style.display = 'none';
    contactSection.style.display = 'block';
    answerSection.style.display = 'none';
  }
  
  // Hide subject list and question form when switching sections
  document.getElementById('subjectList').style.display = 'none';
  document.getElementById('questionForm').style.display = 'none';
}

// Initially show Ask Doubt section
showSection('askDoubtSection');

// Function to handle question submission and simulate responses
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
  
  // Hide Ask Doubt and Contact sections; show Answer section
  document.getElementById('askDoubtSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';
  document.getElementById('answerSection').style.display = 'block';
  
  // Display the submitted question in the question text container
  document.getElementById('displayedQuestion').textContent = question;
  
  // Handle image display if available
  const displayedImage = document.getElementById('displayedImage');
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      displayedImage.src = e.target.result;
      document.getElementById('questionImageContainer').style.display = 'block';
    };
    reader.readAsDataURL(imageFile);
  } else {
    document.getElementById('questionImageContainer').style.display = 'none';
  }
  
  // Initially, hide the answers container and reset the "See Answers" button text
  document.getElementById('answersContainer').style.display = 'none';
  document.getElementById('seeAnswersBtn').textContent = 'See Answers';
  
  // Immediately show AI answer if selected
  document.getElementById('aiAnswer').style.display = prefAI ? 'block' : 'none';
  
  // Simulate Teacher response after 3 seconds if selected
  if (prefTeacher) {
    setTimeout(() => {
      document.getElementById('teacherAnswer').innerHTML = "<strong>Teacher:</strong><p>This is a simulated teacher response.</p>";
      document.getElementById('teacherAnswer').style.display = 'block';
    }, 3000);
  } else {
    document.getElementById('teacherAnswer').style.display = 'none';
  }
  
  // Simulate Peers response after 3 seconds if selected
  if (prefPeers) {
    setTimeout(() => {
      document.getElementById('peersAnswer').innerHTML = "<strong>Peers:</strong><p>This is a simulated peer response.</p>";
      document.getElementById('peersAnswer').style.display = 'block';
    }, 3000);
  } else {
    document.getElementById('peersAnswer').style.display = 'none';
  }
  
  // Reset form fields
  document.getElementById('questionInput').value = '';
  document.getElementById('imageUpload').value = '';
  document.getElementById('prefAI').checked = false;
  document.getElementById('prefTeacher').checked = false;
  document.getElementById('prefPeers').checked = false;
  
  console.log("Question submitted:", question);
}

// Function to toggle the display of the answers container
function toggleAnswers() {
  const answersContainer = document.getElementById('answersContainer');
  const btn = document.getElementById('seeAnswersBtn');
  
  if (answersContainer.style.display === 'none' || answersContainer.style.display === '') {
    answersContainer.style.display = 'block';
    btn.textContent = 'Hide Answers';
  } else {
    answersContainer.style.display = 'none';
    btn.textContent = 'See Answers';
  }
}

// Mobile sidebar toggle function
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('collapsed');
}
