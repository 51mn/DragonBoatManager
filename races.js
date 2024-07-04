const regattaSelected = JSON.parse(localStorage.getItem("regattaSelected"));
const raceList = JSON.parse(localStorage.getItem("raceList"));
const distance = document.getElementById('distance');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const raceType = document.getElementById('raceType');
const twentyRadio = document.getElementById('20sRadio');
const tenRadio = document.getElementById('10sRadio'); 

onLoadFunction = () => {
    document.getElementById('racesTitle').textContent = raceList[regattaSelected]["regatta"];
    for (i = 0; i < raceList[regattaSelected]["races"].length; i++) {
        listRaces(i);
    };
};

raceClicked = (e) => {
    const raceSelected = e.target.getAttribute("raceSelected");
    localStorage.setItem("raceSelected", raceSelected);
    window.location.assign("/DragonBoatManager/boat.html");
};

listRaces = (i) => {
    listItemHolder = document.getElementById('raceList').appendChild(document.createElement("div"));
    listItemHolder.classList.add('listItemHolder');
    divNode = listItemHolder.appendChild(document.createElement("div")); 
    divNode.classList.add('box-box-box');
    divNode.textContent = 
    raceList[regattaSelected]["races"][i]["distance"].concat(
        " | ",raceList[regattaSelected]["races"][i]["age"],
        " | ",raceList[regattaSelected]["races"][i]["gender"],
        " | ",raceList[regattaSelected]["races"][i]["twentyRadio"],
        " | ",raceList[regattaSelected]["races"][i]["raceType"]);
    divNode.setAttribute("raceSelected",i)
    divNode.setAttribute("onclick","raceClicked(event)")
    deleteBtn = listItemHolder.appendChild(document.createElement("button"));
    deleteBtn.classList.add('delete-button');
    deleteBtn.setAttribute("raceNum",i);
    deleteBtn.setAttribute("onclick","deleteRaceBtn(event)");
    deleteBtn.innerHTML = "&#215";
};

deleteRaceBtn = (e) => {
    i = e.target.getAttribute("raceNum");
    raceList[regattaSelected]["races"].splice(i,1);
    localStorage.setItem('raceList',JSON.stringify(raceList));
    location.reload()
};

addRaceBtn = () => {
    raceLength = raceList[regattaSelected]["races"].length;
    distanceV = (distance.value.charAt(0).toUpperCase() + distance.value.slice(1).toLowerCase()).trim();
    ageV = (age.value.charAt(0).toUpperCase() + age.value.slice(1).toLowerCase()).trim();
    genderV = (gender.value.charAt(0).toUpperCase() + gender.value.slice(1).toLowerCase()).trim();
    raceTypeV = (raceType.value.charAt(0).toUpperCase() + raceType.value.slice(1).toLowerCase()).trim();
    raceList[regattaSelected]["races"][raceLength] = {
        distance:distanceV,
        age:ageV,
        gender:genderV,
        raceType:raceTypeV,
        twentyRadio:(twentyRadio.checked) ? ("20") : ("10"),
        people:Array.apply(null, Array((twentyRadio.checked) ? (22) : (12)))
    };
    localStorage.setItem('raceList', JSON.stringify(raceList));
    distance.value = "";
    age.value = "";
    gender.value = "";
    raceType.value = "";
    twentyRadio.checked = false;
    tenRadio.checked = false;
};