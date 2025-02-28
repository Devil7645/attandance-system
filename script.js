// Get form and records container
const attendanceForm = document.getElementById('attendanceForm');
const attendanceRecordsContainer = document.getElementById('attendanceRecords');
const mainContent = document.getElementById('mainContent');
const recordsContent = document.getElementById('recordsContent');
const settingsContent = document.getElementById('settingsContent');
const helpContent = document.getElementById('helpContent');
const settingsForm = document.getElementById('settingsForm');
const searchRecordsInput = document.getElementById('searchRecords');
const totalRecordsSpan = document.getElementById('totalRecords');
const presentCountSpan = document.getElementById('presentCount');
const absentCountSpan = document.getElementById('absentCount');

// Function to add attendance record
function addAttendanceRecord(studentName, studentId, studentClass, attendanceDate, attendanceStatus) {
    const attendanceRecords = getAttendanceRecords();
    attendanceRecords.push({
        id: Date.now(),
        studentName: studentName,
        studentId: studentId,
        studentClass: studentClass,
        attendanceDate: attendanceDate,
        attendanceStatus: attendanceStatus,
        timestamp: Date.now()
    });
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
    updateDashboard();
}

// Function to get attendance records from localStorage
function getAttendanceRecords() {
    const storedRecords = localStorage.getItem("attendanceRecords");
    return storedRecords ? JSON.parse(storedRecords) : [];
}

// Function to display attendance records
function displayAttendanceRecords() {
    const attendanceRecords = getAttendanceRecords();
    let html = '';
    if (attendanceRecords.length > 0) {
        for (const record of attendanceRecords) {
            html += `
                <p>
                    <b>Student Name:</b> ${record.studentName}<br>
                    <b>Student ID:</b> ${record.studentId}<br>
                    <b>Class:</b> ${record.studentClass}<br>
                    <b>Attendance Date:</b> ${record.attendanceDate}<br>
                    <b>Attendance Status:</b> ${record.attendanceStatus}<br>
                    <b>Timestamp:</b> ${new Date(record.timestamp).toLocaleString()}<br>
                    <button class="edit-button" onclick="editRecord(${record.id})">Edit</button>
                    <button class="delete-button" onclick="deleteRecord(${record.id})">Delete</button><br><br>
                </p>
            `;
        }
    } else {
        html = '<p>No records found.</p>';
    }
    attendanceRecordsContainer.innerHTML = html;
}

// Function to edit attendance record
function editRecord(id) {
    const attendanceRecords = getAttendanceRecords();
    const recordToEdit = attendanceRecords.find(record => record.id === id);
    if (recordToEdit) {
        const studentName = prompt("Enter new Student Name:", recordToEdit.studentName);
        const studentId = prompt("Enter new Student ID:", recordToEdit.studentId);
        const studentClass = prompt("Enter new Student Class:", recordToEdit.studentClass);
        const attendanceDate = prompt("Enter new Attendance Date:", recordToEdit.attendanceDate);
        const attendanceStatus = prompt("Enter new Attendance Status:", recordToEdit.attendanceStatus);
        
        if (studentName && studentId && studentClass && attendanceDate && attendanceStatus) {
            recordToEdit.studentName = studentName;
            recordToEdit.studentId = studentId;
            recordToEdit.studentClass = studentClass;
            recordToEdit.attendanceDate = attendanceDate;
            recordToEdit.attendanceStatus = attendanceStatus;
            localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
            displayAttendanceRecords();
            updateDashboard();
        }
    }
}

// Function to delete attendance record
function deleteRecord(id) {
    const attendanceRecords = getAttendanceRecords();
    const filteredRecords = attendanceRecords.filter(record => record.id !== id);
    localStorage.setItem("attendanceRecords", JSON.stringify(filteredRecords));
    displayAttendanceRecords();
    updateDashboard();
}

// Function to update dashboard
function updateDashboard() {
    const attendanceRecords = getAttendanceRecords();
    totalRecordsSpan.textContent = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(record => record.attendanceStatus === 'present').length;
    const absentCount = attendanceRecords.filter(record => record.attendanceStatus === 'absent').length;
    presentCountSpan.textContent = presentCount;
    absentCountSpan.textContent = absentCount;
}

// Function to search records
function searchRecords() {
    const searchQuery = searchRecordsInput.value.toLowerCase();
    const attendanceRecords = getAttendanceRecords();
    let html = '';
    if (attendanceRecords.length > 0) {
        for (const record of attendanceRecords) {
            if (record.studentName.toLowerCase().includes(searchQuery) || record.studentId.toLowerCase().includes(searchQuery)) {
                html += `
                    <p>
                        <b>Student Name:</b> ${record.studentName}<br>
                        <b>Student ID:</b> ${record.studentId}<br>
                        <b>Class:</b> ${record.studentClass}<br>
                        <b>Attendance Date:</b> ${record.attendanceDate}<br>
                        <b>Attendance Status:</b> ${record.attendanceStatus}<br>
                        <b>Timestamp:</b> ${new Date(record.timestamp).toLocaleString()}<br>
                        <button class="edit-button" onclick="editRecord(${record.id})">Edit</button>
                        <button class="delete-button" onclick="deleteRecord(${record.id})">Delete</button><br><br>
                    </p>
                `;
            }
        }
    } else {
        html = '<p>No records found.</p>';
    }
    attendanceRecordsContainer.innerHTML = html;
}

// Function to display records
function displayRecords() {
    mainContent.style.display = 'none';
    recordsContent.style.display = 'block';
    settingsContent.style.display = 'none';
    helpContent.style.display = 'none';
    displayAttendanceRecords();
}

// Function to display settings
function displaySettings() {
    mainContent.style.display = 'none';
    recordsContent.style.display = 'none';
    settingsContent.style.display = 'block';
    helpContent.style.display = 'none';
}

// Function to display help
function displayHelp() {
    mainContent.style.display = 'none';
    recordsContent.style.display = 'none';
    settingsContent.style.display = 'none';
    helpContent.style.display = 'block';
}

// Function to display main content
function displayMainContent() {
    mainContent.style.display = 'block';
    recordsContent.style.display = 'none';
    settingsContent.style.display = 'none';
    helpContent.style.display = 'none';
}

// Function to apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Handle form submission
attendanceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const studentClass = document.getElementById('studentClass').value;
    const attendanceDate = document.getElementById('attendanceDate').value;
    const attendanceStatus = document.getElementById('attendanceStatus').value;
    addAttendanceRecord(studentName, studentId, studentClass, attendanceDate, attendanceStatus);
    attendanceForm.reset();
});

// Handle settings form submission
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const theme = document.getElementById('theme').value;
    applyTheme(theme);
    displayMainContent();
});

// Handle search input
searchRecordsInput.addEventListener('input', searchRecords);

// Display main content on page load
displayMainContent();
updateDashboard();
