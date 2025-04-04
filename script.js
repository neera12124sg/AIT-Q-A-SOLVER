console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
});

// Function to show the selected section and hide the other
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

// =========================
// New Code for Question Form
// =========================

// Show question form when a subject is selected
const subjectButtons = document.querySelectorAll("#subjectList button");
const questionForm = document.getElementById("questionForm");

subjectButtons.forEach(button => {
  button.addEventListener("click", () => {
    questionForm.style.display = "block";
  });
});

// Handle form submission
function submitQuestion() {
  const question = document.getElementById("questionInput").value;
  const image = document.getElementById("imageUpload").files[0];
  const ai = document.getElementById("prefAI").checked;
  const teacher = document.getElementById("prefTeacher").checked;
  const peers = document.getElementById("prefPeers").checked;

  console.log("Question:", question);
  console.log("Image:", image);
  console.log("Preferred by:", {
    AI: ai,
    Teacher: teacher,
    Peers: peers
  });

  alert("Question submitted! (We'll show answers next)");
}
