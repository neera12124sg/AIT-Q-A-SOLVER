console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const form = document.getElementById('questionForm');
  list.style.display = list.style.display === 'none' ? 'block' : 'none';

  // Hide form when subject list is hidden
  if (list.style.display === 'none') {
    form.style.display = 'none';
  }
});

// Show question form when any subject is clicked
const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('questionForm').style.display = 'block';
  });
});

// Function to show the selected section and hide the other
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

  // Hide subject list and form when switching
  document.getElementById('subjectList').style.display = 'none';
  document.getElementById('questionForm').style.display = 'none';
}

// Initially show Ask Doubt section
showSection('askDoubtSection');

// Function to handle question submission
function submitQuestion() {
  const question = document.getElementById('questionInput').value;
  const image = document.getElementById('imageUpload').files[0];
  const useAI = document.getElementById('prefAI').checked;
  const useTeacher = document.getElementById('prefTeacher').checked;
  const usePeers = document.getElementById('prefPeers').checked;

  if (!question.trim()) {
    alert("Please type a question.");
    return;
  }

  // Show the answer section
  document.getElementById('askDoubtSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';
  document.getElementById('answerSection').style.display = 'block';

  // Show question
  document.getElementById('displayedQuestion').textContent = question;

  // Show image if attached
  const imageElement = document.getElementById('displayedImage');
  if (image) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageElement.src = e.target.result;
      imageElement.style.display = 'block';
    };
    reader.readAsDataURL(image);
  } else {
    imageElement.style.display = 'none';
  }

  // Show answers
  document.getElementById('aiAnswer').style.display = useAI ? 'block' : 'none';
  document.getElementById('teacherAnswer').style.display = useTeacher ? 'block' : 'none';
  document.getElementById('peersAnswer').style.display = usePeers ? 'block' : 'none';
}

// Toggle Sidebar on Mobile
function toggleSidebar() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('collapsed');
}
