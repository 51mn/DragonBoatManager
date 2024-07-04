const raceList = JSON.parse(localStorage.getItem('raceList')) || [];

document.addEventListener('keyup', () => {
    document.getElementById('regatta-btn').disabled = !document.getElementById('regattaName').value;
});

regattaClicked = (e) => {
    regattaSelected = e.target.getAttribute("regattaSelected");
    console.log(regattaSelected);
    localStorage.setItem("regattaSelected", regattaSelected);
    window.location.assign("/DragonBoatManager/races.html");
};

listRegattas = (i) => {
    listItemHolder = document.getElementById('regattaList').appendChild(document.createElement("div"));
    listItemHolder.classList.add('listItemHolder');
    divNode = listItemHolder.appendChild(document.createElement("div")); 
    divNode.classList.add('box-box-box');
    divNode.setAttribute("onclick","regattaClicked(event)")
    divNode.textContent = raceList[i]["regatta"];
    divNode.setAttribute("regattaSelected",i);
    deleteBtn = listItemHolder.appendChild(document.createElement("button"));
    deleteBtn.classList.add('delete-button');
    deleteBtn.setAttribute("onclick","deleteRegattaBtn(event)");
    deleteBtn.setAttribute("regattaNum",i);
    deleteBtn.innerHTML = "&#215";
};

deleteRegattaBtn = (e) => {
    i = e.target.getAttribute("regattaNum");
    raceList.splice(i,1);
    localStorage.setItem('raceList',JSON.stringify(raceList));
    e.target.parentElement.remove();
    for (i = 0; i < raceList.length; i++) {
        document.getElementsByClassName('box-box-box')[i].setAttribute("regattaSelected",i);
    }
};

onLoadFunction = () => {
    for (i = 0; i < raceList.length; i++) {
        listRegattas(i);
    };
};
  
addRegattaBtn = () => {
    regattaNameV = regattaName.value;
    raceList.push({regatta:regattaNameV, races:[]});
    localStorage.setItem('raceList', JSON.stringify(raceList));
    i = (raceList.length-1);
    listRegattas(i);
    document.getElementById('regattaName').value = "";
};