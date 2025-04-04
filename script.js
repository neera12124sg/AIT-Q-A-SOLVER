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
