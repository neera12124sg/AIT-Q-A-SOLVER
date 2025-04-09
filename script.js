console.log("MIT AOE Solver Loaded!");

// ====== Sidebar Toggle ======
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  if (nav) nav.classList.toggle('collapsed');
}

// ====== Section Switcher ======
function showSection(sectionId) {
  const sections = ['askDoubtSection', 'contactSection', 'answerSheetSection', 'getAnswerAISection'];
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) targetSection.style.display = 'block';

  // Reset Ask Doubt view every time (only if needed)
  const subjectList = document.getElementById('subjectList');
  const questionForm = document.getElementById('questionForm');
  if (subjectList) subjectList.style.display = 'none';
  if (questionForm) questionForm.style.display = 'none';
}

// ====== Submit Question and Save ======
function submitQuestion() {
  const question = document.getElementById('questionInput').value.trim();
  const imageFile = document.getElementById('imageUpload').files[0];
  const prefAI = document.getElementById('prefAI').checked;
  const prefTeacher = document.getElementById('prefTeacher').checked;
  const prefPeers = document.getElementById('prefPeers').checked;
  const subjectElement = document.getElementById('selectedSubjectTitle');
  const subject = subjectElement ? subjectElement.textContent.replace('Subject: ', '') : 'General';

  console.log("Submitting doubt with subject:", subject); // Debug

  if (!question) {
    alert("Please enter your question.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Image = imageFile ? e.target.result : null;

    const doubtData = {
      question: question,
      image: base64Image,
      subject: subject,
      aiAnswer: prefAI ? "AI-generated answer: Placeholder response." : "",
      teacherAnswer: "",
      peerAnswer: "",
      answeredBy: "",
      upvotes: {
        ai: 0,
        teacher: 0,
        peer: 0
      },
      timestamp: new Date().toISOString()
    };

    // Display the answer
    displayAnswer(doubtData);

    // Reset the form
    document.getElementById('questionInput').value = '';
    document.getElementById('imageUpload').value = '';
    document.getElementById('prefAI').checked = false;
    document.getElementById('prefTeacher').checked = false;
    document.getElementById('prefPeers').checked = false;

    // Show the answer section
    document.getElementById('askDoubtSection').style.display = 'none';
    document.getElementById('answerSheetSection').style.display = 'block';
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

  const aiAnswerText = document.getElementById('aiAnswerText');
  if (aiAnswerText) aiAnswerText.textContent = doubt.aiAnswer || '';
  const aiAnswer = document.getElementById('aiAnswer');
  if (aiAnswer) aiAnswer.style.display = doubt.aiAnswer ? 'block' : 'none';

  // Add the "Not yet functional" mark
  const aiAnswerMark = document.createElement('p');
  aiAnswerMark.style.color = '#ff0000';
  aiAnswerMark.style.fontWeight = 'bold';
  aiAnswerMark.textContent = "Not Yet Functional";
  aiAnswer.appendChild(aiAnswerMark);
}

// ====== Load Recent Doubts ======
function loadRecentDoubts() {
  // Placeholder for loading recent doubts from a database or file
}

// ====== Initialize After DOM Loads ======
document.addEventListener('DOMContentLoaded', () => {
  showSection('askDoubtSection'); // Set the initial section to Ask Doubt
});
