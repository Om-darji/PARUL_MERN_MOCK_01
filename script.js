// Supposed Array for DataBase

let students = [];

// DOM Elements
const form = document.getElementById('stuForm');
const container = document.getElementById('studentContainer');
const aboutInput = document.getElementById('about');
const charCount = document.getElementById('charCount');
const filterCourse = document.getElementById('filterCourse');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

aboutInput.addEventListener('input', () => {
    const currentLength = aboutInput.value.length;
    charCount.textContent = `${currentLength} / 200`;
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm()) {
        saveStudent();
    }
});

resetBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
    charCount.textContent = "0 / 200";
    submitBtn.textContent = "Register Student";
});


//Function definitions---->

function validateForm() {
    let isValid = true;

    //Name Validation
    const stuName = document.querySelector('#studentName').value.trim();
    isValid = validateName(stuName)

    //Email validated by input tag itself

    //Phone number Validation
    const PhoneNumber = document.querySelector('#phone').value.trim();
    isValid = validatePhone(PhoneNumber)

    //DOB validation
    const dob = document.getElementById('dob').value;
    isValid = validateDOB(dob)

    //gender validation
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        errorMessage = 'Please select a gender'
        isValid = false;
    }

    const course = document.getElementById('course').value;
    if (course === "") {
        errorMessage = 'Please select a course';
        isValid = false;
    }

    // 7. Skills Validation
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if (skills.length === 0) {
        errorMessage = 'Select at least one skill'
        isValid = false;
    }

    // 8. About Validation
    const about = document.getElementById('about').value.trim();
    if (about.length < 20 || about.length > 200) {
        errorMessage = 'Required: between 20 and 200 characters'
        isValid = false;
    }

    // 9. Photo Validation (only validate if adding new, or if file is selected during edit)
    const photo = document.getElementById('photo');
    if (photo.files.length === 0) {
        errorMessage = 'Profile photo is required'
        isValid = false;
    } else if (photo.files.length > 0) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(photo.files[0].type)) {
            errorMessage = 'photoError', 'Only .jpg, .jpeg, and .png allowed'
            isValid = false;
        }
    }
    
    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

function validateName(name) {

    let isValid = true;
    let errorMessage = "";

    if (name === "") {
        isValid = false;
        errorMessage = "Name is required.";
    } 
    // Length check
    else if (name.length < 3 || name.length > 40) {
        isValid = false;
        errorMessage = "Name must be between 3 and 40 characters long.";
    } 
    // Character Checks 
    else {
        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            const isSpace = (char === " ");
            const isLetter = (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");

            if (!isLetter && !isSpace) {
                isValid = false;
                errorMessage = "Name can only contain letters and spaces.";
                break; 
            }
        }
    }

    // Alert if Error
    if (!isValid) {
        alert(errorMessage); 
    }

    return isValid;
}

function validatePhone(number) {

    let isValid = true;
    let errorMessage = "";

    if (number === "") {
        isValid = false;
        errorMessage = "Phone number is required";
    } 

    else if (number.length < 10 || number.length > 10) {
        isValid = false;
        errorMessage = "Number must be 10 digit long";
    } 

    else {
        for (let i = 0; i < number.length; i++) {
            const char = number[i];
            const isSpace = (char === " ");
            const isLetter = (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");

            if (isLetter && isSpace) {
                isValid = false;
                errorMessage = "Number must contain only digits";
                break; 
            }
        }
    }

    // Alert if Error
    if (!isValid) {
        alert(errorMessage); 
    }

    return isValid;

}

function validateDOB(dob) {
    if (!dob) {
        errorMessage = 'Date of birth is required.'
        isValid = false;
    } else {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (dobDate > today) {
            errorMessage = 'Future dates are not allowed.'
            isValid = false;
        } else if (age < 15) {
            errorMessage = 'Student must be at least 15 years old.'
            isValid = false;
        }
    }

    // Alert if Error
    if (!isValid) {
        alert(errorMessage); 
    }

    return isValid;

}
