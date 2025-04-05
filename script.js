console.log("MIT AOE Solver Loaded!");

// Toggle subject list when ASK DOUBT button is clicked
document.getElementById('askDoubtBtn').addEventListener('click', () => {
    const list = document.getElementById('subjectList');
    const form = document.getElementById('questionForm');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
    form.style.display = 'none';
});

// Show question form when a subject is clicked
document.querySelectorAll('#subjectList button').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('questionForm').style.display = 'block';
    });
});

// Show sections
function showSection(sectionId) {
    document.getElementById('askDoubtSection').style.display = sectionId === 'askDoubtSection' ? 'block' : 'none';
    document.getElementById('contactSection').style.display = sectionId === 'contactSection' ? 'block' : 'none';
    document.getElementById('answerSection').style.display = 'none';
}

// Handle question submission
function submitQuestion() {
    const question = document.getElementById('questionInput').value.trim();
    const imageFile = document.getElementById('imageUpload').files[0];

    if (!question) {
        alert("Please enter your question.");
        return;
    }

    document.getElementById('displayedQuestion').textContent = question;
    document.getElementById('answerSection').style.display = 'block';

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('displayedImage').src = e.target.result;
            document.getElementById('displayedImage').style.display = 'block';
        };
        reader.readAsDataURL(imageFile);
    } else {
        document.getElementById('displayedImage').style.display = 'none';
    }
}

// Toggle answers visibility
function toggleAnswers() {
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.style.display = answersContainer.style.display === 'block' ? 'none' : 'block';
}
