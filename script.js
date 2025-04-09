console.log("MIT AOE Solver Loaded!");

// ====== Firebase Config ======
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ====== Sidebar Toggle ======
function toggleSidebar() {
  const nav = document.getElementById('sidebar');
  if (nav) nav.classList.toggle('collapsed');
}

// ====== Section Switcher ======
function showSection(sectionId) {
  const sections = ['askDoubtSection', 'contactSection', 'answerSection', 'recentDoubtSection'];
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

  // Load recent doubts when switching to that section
  if (sectionId === 'recentDoubtSection') {
    loadRecentDoubts();
  }
}

// ====== Submit Question and Save to Firestore ======
function submitQuestion() {
  const question = document.getElementById('questionInput').value.trim();
  const imageFile = document.getElementById('imageUpload').files[0];
  const prefAI = document.getElementById('prefAI').checked;
  const prefTeacher = document.getElementById('prefTeacher').checked;
  const prefPeers = document.getElementById('prefPeers').checked;
  const subjectElement = document.getElementById('selectedSubjectTitle');
  const subject = subjectElement.textContent.replace('Subject: ', '') || 'General';
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
      aiAnswer: prefAI ? generateAIAnswer(question) : "",
      teacherAnswer: "",
      peerAnswer: "",
      answeredBy: "",
      upvotes: {
        ai: 0,
        teacher: 0,
        peer: 0
      },
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("doubts")
      .add(doubtData)
      .then((docRef) => {
        console.log("Doubt saved with ID:", docRef.id); // Debug
        displayAnswer(doubtData);

        // Reset form
        document.getElementById('questionInput').value = '';
        document.getElementById('imageUpload').value = '';
        document.getElementById('prefAI').checked = false;
        document.getElementById('prefTeacher').checked = false;
        document.getElementById('prefPeers').checked = false;

        // Use inline logic for navigation
        document.getElementById('askDoubtSection').style.display = 'none';
        document.getElementById('answerSection').style.display = 'block';
        document.getElementById('displayedQuestion').textContent = question;

        // Listen for teacher answer if selected
        if (prefTeacher) {
          db.collection('doubts').doc(docRef.id).onSnapshot(doc => {
            const data = doc.data();
            if (data && data.teacherAnswer) {
              console.log("Teacher answer received:", data.teacherAnswer); // Debug
              document.getElementById('teacherAnswerText').textContent = data.teacherAnswer;
              document.getElementById('teacherAnswer').style.display = 'block';
            }
          });
        }
      })
      .catch(error => {
        console.error("Error saving to Firestore:", error);
      });
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

  const teacherAnswer = document.getElementById('teacherAnswer');
  if (teacherAnswer) teacherAnswer.style.display = 'none';
  const peersAnswer = document.getElementById('peersAnswer');
  if (peersAnswer) peersAnswer.style.display = 'none';
}

// ====== Simulated AI Answer Generator ======
function generateAIAnswer(question) {
  return `AI thinks the answer to "${question}" might involve some basic concepts from your subject. Please review your textbook or ask a teacher for deeper help.`;
}

// ====== Load Recent Doubts ======
function loadRecentDoubts() {
  const container = document.getElementById('recentDoubtsContainer');
  if (!container) return;

  container.innerHTML = ''; // Clear existing content

  const subjects = ['Physics', 'Chemistry', 'Electronics', 'Mechanics'];
  subjects.forEach(subject => {
    db.collection('doubts')
      .where('subject', '==', subject)
      .orderBy('timestamp', 'desc')
      .limit(2)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            const doubtDiv = document.createElement('div');
            doubtDiv.className = 'question-box';
            doubtDiv.innerHTML = `<p><strong>${subject}:</strong> ${data.question}</p>`;
            container.appendChild(doubtDiv);
          }
        });
      });
  });
}

// ====== Initialize After DOM Loads ======
document.addEventListener('DOMContentLoaded', () => {
  showSection('askDoubtSection'); // Set initial section
});