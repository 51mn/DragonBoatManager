const peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
const raceList = JSON.parse(localStorage.getItem('raceList')) || [];
const regattaSelected = JSON.parse(localStorage.getItem('regattaSelected'));
const raceSelected = JSON.parse(localStorage.getItem('raceSelected'));
(raceList[regattaSelected]["races"][raceSelected]["twentyRadio"] == "20") ? (boatSize = 20) : (boatSize = 10);

addPersonBtnf = (e) => {
    if (e.target.nextSibling.style.display == 'block') {
        e.target.nextSibling.style.display = 'none';
    } else {
        for (i = 0; i < boatSize+2; i++) {
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
    (peopleInRace()[seatNum] == null) ? ("+") : displayName(seatNum);
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
    updateStats();
};

personClicked = (e) => {
    seatNum = e.target.parentElement.parentElement.getAttribute('seatNum');
    personSelected = peopleList[e.target.getAttribute('personNum')];
    for (i=0;i<boatSize+2;i++) {
        if (JSON.stringify(personSelected) === JSON.stringify(peopleInRace()[i])) {
            peopleInRace()[i] = null;
            document.getElementsByClassName('addPersonContainer')[(i>1) ? (i-2) : (boatSize==20 ? i+20 : i+10)].firstChild.textContent="+";
        };
    };
    peopleInRace()[seatNum] = personSelected;
    e.target.parentElement.parentElement.parentElement.previousSibling.textContent = displayName(seatNum);
    localStorage.setItem('raceList',JSON.stringify(raceList));
    updateStats();
};

displayName = (seatNum) => {
    return `${peopleInRace()[seatNum]["firstName"]}. ${peopleInRace()[seatNum]["lastName"].charAt(0)} (${peopleInRace()[seatNum]["weight"]}kg)`;
};

peopleInRace = () => {
    return raceList[regattaSelected]["races"][raceSelected]["people"];
}

twoDecPlaces = (roundable) => {
    return Math.round(roundable*100)/100
}

updateStats = () => {
    horiRadiI = (boatSize==20) ? ([300,330,350,350,350,350,350,350,330,300]) : ([300,330,350,330,300]);
    horiRadiInorm = horiRadiI.map((x) => x / 350);
    vertRadiI = (boatSize==20) ? ([6,4.5,3.5,2.5,1.5,0.5,-0.5,-1.5,-2.5,-3.5,-4.5,-6]) : ([4.5,3,1.5,0,-1.5,-3,-4.5]);
    vertRadiInorm = (boatSize==20) ? vertRadiI.map((x) => x / 6) : vertRadiI.map((x) => x / 4.5);
    horiDiffs = [];
    horiWeights = [];
    horiWeights.push((peopleInRace()[1] === null) ? 0 : Number(peopleInRace()[1]["weight"])+14)
    for (i=1;i<(boatSize/2)+1;i++) {
        p1 = (peopleInRace()[2*i] === null) ? 0 : Number(peopleInRace()[2*i]["weight"]);
        p2 = (peopleInRace()[2*i+1] === null) ? 0 : Number(peopleInRace()[2*i+1]["weight"]);
        horiDiffs.push(p2 - p1);
        horiWeights.push(p1 + p2);
    };
    horiWeights.push((peopleInRace()[0] === null) ? 0 : Number(peopleInRace()[0]["weight"])+7)

    weightedDiffs = [];
    for (i=0;i<boatSize/2;i++) {
        weightedDiffs.push(horiDiffs[i]*horiRadiInorm[i]);
    };
    horiBal = weightedDiffs.reduce((a, a1) => a + a1, 0);

    vertWeightedDiffs = [];
    for (i=0;i<boatSize/2+2;i++) {
        vertWeightedDiffs.push(vertRadiInorm[i] * horiWeights[i]);
    }
    vertBal = vertWeightedDiffs.reduce((a, a1) => a + a1, 0);

    totalWeight = 0;
    peopleCounted = 0;
    for (i=2;i<boatSize+2;i++) {
        if (!(peopleInRace()[i] === null)) {
            totalWeight +=Number(peopleInRace()[i]['weight']);
            peopleCounted += 1;
        }
    }
    averageWeight = twoDecPlaces(totalWeight/(peopleCounted)) || 0;

    document.getElementById("statsOutput").innerHTML = '';

    document.getElementById("statsOutput").innerHTML += `<br>Total paddler weight: ${totalWeight}kg<br>`;
    document.getElementById("statsOutput").innerHTML += `Average paddler weight: ${averageWeight}kg<br><br>`;

    for (i=0;i<boatSize/2;i++) {
        document.getElementById("statsOutput").innerHTML += `Row ${i+1} diff: ${twoDecPlaces(weightedDiffs[i])}kg<br>`;
    }
    document.getElementById("statsOutput").innerHTML += `<br>Right-left balance: ${twoDecPlaces(horiBal)}kg<br>`;
    document.getElementById("statsOutput").innerHTML += `<br>Front-back balance: ${twoDecPlaces(vertBal)}kg<br>`;
}

createRipple = (e) => {
    button = e.currentTarget;
    ripple = document.createElement("span");
    ripple.classList.add("ripple"); 

    rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`; // Adjusted for ripple center
    ripple.style.top = `${e.clientY - rect.top}px`; // Adjusted for ripple center
    button.appendChild(ripple);

    peopleInRace().fill(null);
    for (i = 0; i < boatSize+2; i++) {
        document.getElementsByClassName('addPersonContainer')[i].firstChild.textContent="+";
    }
    localStorage.setItem('raceList',JSON.stringify(raceList));
    updateStats();
}

document.getElementById('clearBoat').addEventListener('click', createRipple);