const peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
const firstName = document.getElementById("firstName");
const lastName = document.getElementById('lastName');
const weight = document.getElementById('weight');
const womensRadio = document.getElementById('womensRadio');
const opensRadio = document.getElementById('opensRadio');

onLoadFunction = () => {
    let data = JSON.parse(localStorage.getItem('peopleList'));
    let peopleTable = document.getElementById("peopleTable");
    for (y = 0; y < Object.values(data).length; y++) {
        peopleTable.appendChild(document.createElement('tr'));
        for (x = 0; x < Object.values(data[y]).length; x++) {
            let td = document.createElement('td');
            td.innerHTML = Object.values(data[y])[x];
            peopleTable.appendChild(td);
        };
        tdBalls = document.createElement('td');
        tdBalls.innerHTML = ("&#215");
        tdBalls.setAttribute("onclick","deleteGuyBtn(event)");
        tdBalls.setAttribute("guyNum",y);
        tdBalls.classList.add("deleteGuyBtn");
        peopleTable.appendChild(tdBalls);
    };
};

deleteGuyBtn = (e) => {
    console.log(e.target.getAttribute("guyNum"));
    i = e.target.getAttribute("guyNum");
    peopleList.splice(i,1);
    localStorage.setItem('peopleList',JSON.stringify(peopleList));
    location.reload();
};