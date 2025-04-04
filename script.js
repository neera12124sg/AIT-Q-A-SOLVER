console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const questionForm = document.getElementById('questionForm');

  const isVisible = list.style.display === 'block';
  list.style.display = isVisible ? 'none' : 'block';

  // Always hide the question form when toggling
  questionForm.style.display = 'none';
});

// Subject button click logic
const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('questionForm').style.display = 'block';
  });
});

// Show section logic
function showSection(sectionId) {
  const askSection = document.getElementById('askDoubtSection');
  const contactSection = document.getElementById('contactSection');

  if (sectionId === 'askDoubtSection') {
    askSection.style.display = 'block';
    contactSection.style.display = 'none';
  } else {
    askSection.style.display = 'none';
    contactSection.style.display = 'block';
  }
}

// Initially show Ask Doubt section
showSection('askDoubtSection');

// Dummy submit function (to be updated later)
function submitQuestion() {
  const question = document.getElementById('questionInput').value;
  const aiSelected = document.getElementById('prefAI').checked;
  const teacherSelected = document.getElementById('prefTeacher').checked;
  const peersSelected = document.getElementById('prefPeers').checked;

  console.log("Submitted question:", question);
  console.log("Preferences:", {
    AI: aiSelected,
    Teacher: teacherSelected,
    Peers: peersSelected
  });

  // Here later we'll show the answer window and comment system
  alert("Question submitted! (Next: show answer area)");
}
