console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const form = document.getElementById('questionForm');
  // Toggle subject list visibility
  const isVisible = list.style.display === 'block';
  list.style.display = isVisible ? 'none' : 'block';
  // Always hide the question form when toggling the subject list
  form.style.display = 'none';
});

// Show question form when any subject is clicked
const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('questionForm').style.display = 'block';
  });
});

// Function to show the selected section and hide the other sections
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
  
  // Also hide subject list and question form when switching sections
  document.getElementById('subjectList').style.display = 'none';
  document.getElementById('questionForm').style.display = 'none';
}

// Initially show Ask Doubt section
showSection('askDoubtSection');

// Function to handle question submission and simulate answers
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
  
  // Hide Ask Doubt and Contact sections, then show the Answer section
  document.getElementById('askDoubtSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';
  document.getElementById('answerSection').style.display = 'block';
  
  // Display the submitted question
  document.getElementById('displayedQuestion').textContent = question;
  
  // Display the uploaded image if available
  const displayedImage = document.getElementById('displayedImage');
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      displayedImage.src = e.target.result;
      displayedImage.style.display = 'block';
    };
    reader.readAsDataURL(imageFile);
  } else {
    displayedImage.style.display = 'none';
  }
  
  // Simulate responses based on preferences
  document.getElementById('aiAnswer').style.display = prefAI ? 'block' : 'none';
  document.getElementById('teacherAnswer').style.display = prefTeacher ? 'block' : 'none';
  document.getElementById('peersAnswer').style.display = prefPeers ? 'block' : 'none';
  
  // Log details for debugging (optional)
  console.log("Question Submitted:", question);
  console.log("Image File:", imageFile);
  console.log("Preferences:", { AI: prefAI, Teacher: prefTeacher, Peers: prefPeers });
  
  // Reset the form fields
  document.getElementById('questionInput').value = '';
  document.getElementById('imageUpload').value = '';
  document.getElementById('prefAI').checked = false;
  document.getElementById('prefTeacher').checked = false;
  document.getElementById('prefPeers').checked = false;
}

// Mobile sidebar toggle function (if used)
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('collapsed');
}
