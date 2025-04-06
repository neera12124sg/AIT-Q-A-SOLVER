<script>
console.log("MIT AOE Solver Loaded!");

// Sidebar toggle
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('collapsed');
}

// Section switcher
function showSection(sectionId) {
  const sections = ['askDoubtSection', 'contactSection', 'answerSection'];
  sections.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';

  document.getElementById('subjectList').style.display = 'none';
  document.getElementById('questionForm').style.display = 'none';
}

// Show Ask Doubt on load
showSection('askDoubtSection');

// Ask Doubt button logic
document.getElementById('askDoubtBtn').addEventListener('click', () => {
  const list = document.getElementById('subjectList');
  const form = document.getElementById('questionForm');
  const isVisible = list.style.display === 'block';
  list.style.display = isVisible ? 'none' : 'block';
  form.style.display = 'none';
});

// Subject button show form
const subjectButtons = document.querySelectorAll('#subjectList button');
subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('questionForm').style.display = 'block';
  });
});

// ====== Submit Question and Save to localStorage ======
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

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Image = imageFile ? e.target.result : null;

    const newDoubt = {
      id: Date.now(),
      question,
      image: base64Image,
      subject: 'General',
      aiAnswer: prefAI ? generateAIAnswer(question) : null,
      teacherAnswer: null,
      peerAnswer: null,
      upvotes: { ai: 0, teacher: 0, peer: 0 }
    };

    const storedDoubts = JSON.parse(localStorage.getItem('doubts')) || [];
    storedDoubts.push(newDoubt);
    localStorage.setItem('doubts', JSON.stringify(storedDoubts));

    displayAnswer(newDoubt);

    document.getElementById('questionInput').value = '';
    document.getElementById('imageUpload').value = '';
    document.getElementById('prefAI').checked = false;
    document.getElementById('prefTeacher').checked = false;
    document.getElementById('prefPeers').checked = false;

    showSection('answerSection');
    document.getElementById('displayedQuestion').textContent = question;
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload({ target: { result: null } });
  }
}

// ====== Display Submitted Answer Block ======
function displayAnswer(doubt) {
  document.getElementById('displayedQuestion').textContent = doubt.question;

  const imagePreviewBox = document.getElementById('imagePreviewBox');
  const displayedImage = document.getElementById('displayedImage');
  if (doubt.image) {
    displayedImage.src = doubt.image;
    imagePreviewBox.style.display = 'block';
  } else {
    imagePreviewBox.style.display = 'none';
  }

  document.getElementById('aiAnswerText').textContent = doubt.aiAnswer || '';
  document.getElementById('aiAnswer').style.display = doubt.aiAnswer ? 'block' : 'none';

  document.getElementById('teacherAnswer').style.display = 'none';
  document.getElementById('peersAnswer').style.display = 'none';

  document.getElementById('answersContainer').style.display = 'none';
  document.getElementById('toggleAnswerCommentsBtn').style.display = 'block';
}

// ====== Toggle Show Answers Section ======
document.getElementById('toggleAnswerCommentsBtn').addEventListener('click', () => {
  const answersContainer = document.getElementById('answersContainer');

  answersContainer.style.display = 'block';
  document.getElementById('toggleAnswerCommentsBtn').style.display = 'none';

  const useAI = document.getElementById('aiAnswerText').textContent.trim() !== '';
  const useTeacher = false;
  const usePeers = false;

  document.getElementById('aiAnswer').style.display = useAI ? 'block' : 'none';
  document.getElementById('teacherAnswer').style.display = useTeacher ? 'block' : 'none';
  document.getElementById('peersAnswer').style.display = usePeers ? 'block' : 'none';
});

// ====== Voting System ======
function vote(button) {
  const countSpan = button.querySelector('.vote-count');
  let count = parseInt(countSpan.textContent);
  count++;
  countSpan.textContent = count;
}

// ====== Simulated AI Answer Generator ======
function generateAIAnswer(question) {
  return `AI thinks the answer to "${question}" might involve some basic concepts from your subject. Please review your textbook or ask a teacher for deeper help.`;
}
</script>
