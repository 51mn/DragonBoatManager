const raceList = JSON.parse(localStorage.getItem('raceList')) || [];

document.addEventListener('keyup', () => {
    document.getElementById('regatta-btn').disabled = !document.getElementById('regattaName').value;
});

regattaClicked = (e) => {
    const regattaSelected = e.target.getAttribute("regattaSelected");
    localStorage.setItem("regattaSelected", regattaSelected);
    window.location.assign("./races.html");
};

listRegattas = (i) => {
    divNode = document.createElement("div");
    document.getElementById('regattaList').appendChild(divNode); 
    divNode.classList.add('box-box-box');
    regattaAdded = divNode.appendChild(document.createElement("button"));
    regattaAdded.textContent = raceList[i]["regatta"];
    regattaAdded.classList.add('not-button-button');
    regattaAdded.setAttribute("regattaSelected",i);
    regattaAdded.setAttribute("onclick","regattaClicked(event)")
    deleteBtn = divNode.appendChild(document.createElement("button"));
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

//raceList = [{regattaName:regatta, races:[{gender:opens, size:10, age:junior, distance:200m, people:[0,3,7,1,5,9,2,4,8,6]},{gender:opens, size:20, age:junior, distance:200m, people:[0,3,7,1,5,9,2,4,8,6]}]}]