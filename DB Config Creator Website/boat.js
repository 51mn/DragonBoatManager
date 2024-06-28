const peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
const raceList = JSON.parse(localStorage.getItem('raceList')) || [];
const regattaSelected = JSON.parse(localStorage.getItem('regattaSelected'));
const raceSelected = JSON.parse(localStorage.getItem('raceSelected'));
(raceList[regattaSelected]["races"][raceSelected]["twentyRadio"] == "20") ? (boatSize = 20) : (boatSize = 10);

addPersonBtnf = (e) => {
    if (e.target.nextSibling.style.display == 'block') {
        e.target.nextSibling.style.display = 'none';
    } else {
        for (i = 0; i < boatSize; i++) {
            document.getElementsByClassName('searchPersonContainer')[i].style.display = 'none';
        }
        e.target.nextSibling.style.display = 'block';
    };
};

filterNamesOnKeyUp = (e) => {
    input = e.target.value.toUpperCase();
    li = e.target.nextSibling.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        };
    };
};

addGuyFnctn = () => {
    addPersonContainer = document.createElement('div');
    addPersonContainer.classList.add('addPersonContainer')
    addPersonBtn = document.createElement('button');
    addPersonBtn.classList.add('btn');
    addPersonBtn.classList.add('addPersonBtn');
    addPersonBtn.id = "addPersonBtn";
    addPersonBtn.setAttribute('onclick','addPersonBtnf(event)');
    addPersonBtn.innerText = 
    (raceList[regattaSelected]["races"][raceSelected]["people"][seatNum] == null) ? ("+") : displayName(seatNum);
    addPersonContainer.appendChild(addPersonBtn);
    
    searchPersonContainer = document.createElement('div');
    searchPersonContainer.classList.add('searchPersonContainer')

    myInput = document.createElement('input');
    myInput.type = 'text';
    myInput.id = 'myInput';
    myInput.setAttribute("onkeyup","filterNamesOnKeyUp(event)");
    myInput.placeholder = 'Search for names...';
    searchPersonContainer.appendChild(myInput);

    listBalls = document.createElement('ul');
    listBalls.id = "myUL";
    listBalls.setAttribute("seatNum",seatNum);
    for (personNum = 0; personNum < peopleList.length; personNum++) {
        line = document.createElement('li');
        listBtn = line.appendChild(document.createElement('button'));
        listBtn.setAttribute('personNum',personNum);
        listBtn.setAttribute('onclick','personClicked(event)');
        listBtn.innerHTML = `${peopleList[personNum]["firstName"]} ${peopleList[personNum]["lastName"]} | ${peopleList[personNum]["weight"]}kg`;
        listBalls.appendChild(line);
    };
    searchPersonContainer.appendChild(listBalls);
    addPersonContainer.appendChild(searchPersonContainer);
}

boatOnLoad = () => {
    for (seatNum = 2; seatNum < boatSize+2; seatNum++) {
        addGuyFnctn()
        document.getElementById('boatContainer').appendChild(addPersonContainer)
    };
    for (seatNum = 0; seatNum < 2; seatNum++) {
        addGuyFnctn()
        document.getElementById('dANDsContainer').appendChild(addPersonContainer)
    };
};

personClicked = (e) => {
    seatNum = e.target.parentElement.parentElement.getAttribute('seatNum');
    personSelected = peopleList[e.target.getAttribute('personNum')];
    for (i=0;i<2;i++) {
        if (JSON.stringify(personSelected) === JSON.stringify(raceList[regattaSelected]["races"][raceSelected]["people"][i])) {
            raceList[regattaSelected]["races"][raceSelected]["people"][i] = null;
            document.getElementsByClassName('addPersonContainer')[i].firstChild.textContent="+";
        };
    };
    for (i=2;i<boatSize;i++) {
        if (JSON.stringify(personSelected) === JSON.stringify(raceList[regattaSelected]["races"][raceSelected]["people"][i])) {
            raceList[regattaSelected]["races"][raceSelected]["people"][i] = null;
            document.getElementsByClassName('addPersonContainer')[i-2].firstChild.textContent="+";
        };
    };
    raceList[regattaSelected]["races"][raceSelected]["people"][seatNum] = personSelected;
    e.target.parentElement.parentElement.parentElement.previousSibling.textContent = displayName(seatNum);
    localStorage.setItem('raceList',JSON.stringify(raceList));
};

displayName = (seatNum) => {
    return `${raceList[regattaSelected]["races"][raceSelected]["people"][seatNum]["firstName"]}. ${raceList[regattaSelected]["races"][raceSelected]["people"][seatNum]["lastName"].charAt(0)} (${raceList[regattaSelected]["races"][raceSelected]["people"][seatNum]["weight"]}kg)`;
};

/*peopleInRace = () => {
    return raceList[regattaSelected]["races"][raceSelected]["people"];
}

updateStats = () => {
    horiRadiI = (boatSize==20) ? ([300,330,350,350,350,350,350,350,330,300]) : ([300,330,350,330,300]);
    horiRadiInorm = horiRadiI.map((x) => x / 350);
    vertRadiI = (boatSize==20) ? ([4.5,3.5,2.5,1.5,0.5,-0.5,-1.5,-2.5,-3.5,-4.5]) : ([3.5,1.75,0,-1.75,-3.5]);
    vertRadiInorm = (boatSize==20) ? vertRadiI.map((x) => x / 4.5) : vertRadiI.map((x) => x / 3.5);
    horiDiffs = [];
    for (i=0;i<boatSize/2;i++) {
        p1 = (peopleInRace()[2*i] === null) ? 0 : Number(peopleInRace()[2*i]["weight"]);
        p2 = (peopleInRace()[2*i+1] === null) ? 0 : Number(peopleInRace()[2*i+1]["weight"]);
        horiDiffs.push(p1 - p2);
    };
    weightedDiffs = [];
    for (i=0;i<boatSize/2;i++) {
        weightedDiffs.push(horiDiffs[i]*horiRadiInorm[i]);
    };
    vertWeightedDiffs = [];
    for (i=0;i<boatSize/2;i++) {
        vertWeightedDiffs.push(vertRadiInorm[i] * weightedDiffs[i]);
    }
    horiBal = weightedDiffs.reduce((a, a1, i) => a + a1, 0);
}*/