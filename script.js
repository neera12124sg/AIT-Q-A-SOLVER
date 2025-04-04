console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
});

// Function to show only the selected section
function showSection(sectionId) {
  document.getElementById('askDoubtSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';

  document.getElementById(sectionId).style.display = 'block';
}

// Set default view (Ask Doubt section visible initially)
showSection('askDoubtSection');
