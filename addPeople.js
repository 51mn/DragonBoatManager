document.addEventListener('click', () => {
    document.getElementById("addPersonBtn").disabled = 
    isNaN(weight.value) || 
    !firstName.value || 
    !lastName.value || 
    !weight.value || 
    (!womensRadio.checked && !opensRadio.checked);
});

document.addEventListener('keyup', () => {
    document.getElementById("addPersonBtn").disabled = 
    isNaN(weight.value) || 
    !firstName.value || 
    !lastName.value || 
    !weight.value || 
    (!womensRadio.checked && !opensRadio.checked);
});

addPersonBtn = () => {
    firstNameV = firstName.value.trim();
    lastNameV = lastName.value.trim();
    weightV = weight.value.trim();
    womensRadioV = document.getElementById("womensRadio").checked;
    firstNameF = (firstNameV.charAt(0).toUpperCase() + firstNameV.slice(1).toLowerCase());
    lastNameF = (lastNameV.charAt(0).toUpperCase() + lastNameV.slice(1).toLowerCase());
    (womensRadioV) ? (gender="Womens") : (gender="Opens");
    peopleList.push({
        firstName:firstNameF,
        lastName:lastNameF,
        weight:weightV,
        gender:gender
    });
    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    firstName.value = "";
    lastName.value = "";
    weight.value = "";
    womensRadio.checked = false;
    opensRadio.checked = false;
};