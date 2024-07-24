let choiceItems = [
    {
        id: "gourd",
        imgSrc: "bau.png",
        count: 0
    },
    {
        id: "crab",
        imgSrc: "cua.png",
        count: 0
    },
    {
        id: "shrimp",
        imgSrc: "tom.png",
        count: 0
    },
    {
        id: "fish",
        imgSrc: "ca.png",
        count: 0
    },
    {
        id: "deer",
        imgSrc: "huou.png",
        count: 0
    },
    {
        id: "chicken",
        imgSrc: "ga.png",
        count: 0
    }
];

let spinItems = [
    {
        imgSrc: "bau.png"
    },
    {
        imgSrc: "bau.png"
    },
    {
        imgSrc: "bau.png"
    }
];

function main() {
    showHeader();
    showBoard();
}

main();

function showBoard() {
    const bodyImg = document.getElementById("bodyImg")
    
    let string = '';
    
    choiceItems.forEach((element,index) => {
        string += `
        <button class="img-wrapper" onclick="increaseCount('${index}')">
        <img src='./baucua-img/${element.imgSrc}'/>
        <span id="${element.id}Count">${element.count}</span>
        </button>
        `
    })
    
    bodyImg.innerHTML = string
}

function showHeader() {
    const headerImg = document.getElementById("headerImg")

    let string = '';

    spinItems.forEach((element,index) => {
        string += `
        <div><img src='./baucua-img/${element.imgSrc}' id='${index}'/></div>
        `
    })
    headerImg.innerHTML = string
}


let totalCount = 0;
let chosenItems = [];
let spinResult = [];

function increaseCount(index) {
    
    if (totalCount < 3) {
        totalCount++;
        choiceItems[index].count++

        chosenItems.push(choiceItems[index].id)

        showBoard();
    }
}

function spin() {
    if ( totalCount == 0) {
        alert('Vui lòng đặt ít nhất 1 lần cược');
        return
    }    

    toggleButtons(true);
    
    let timerId = setInterval(myTimer , 30); 
    setTimeout(() => {
        clearInterval(timerId);
        toggleButtons(false);

        displayResult();

    }, 3000);
}

function displayResult() {
    let chosenItemsWithoutDuplicated = Array.from(new Set(chosenItems)); 

    let matchedAll = true;
    for (let i = 0; i < chosenItemsWithoutDuplicated.length; i++) {
        
        let count = 0;

        
        for (let j = 0; j < spinResult.length; j++) {
            if (chosenItemsWithoutDuplicated[i] === spinResult[j]) {
                count++;
            }
        }
        if (count !== 0) {
            console.log(`ban da chon trung ${count} ${chosenItemsWithoutDuplicated[i]}`);
        } else {
            matchedAll = false
        }
    }

    if (chosenItemsWithoutDuplicated.length == 0 || !matchedAll ) {
        console.log(`Rat tiec ban khong chon trung con nao`);
    }
}

function toggleButtons(disabled) {
    $('#btnSpin').prop('disabled', disabled);
    $('#btnReset').prop('disabled', disabled);
    $('.img-wrapper').prop('disabled', disabled);
}

function myTimer() {

    spinResult = [];

    spinItems.forEach(element => {
        let index = Math.floor(Math.random() * choiceItems.length);
        element.imgSrc = choiceItems[index].imgSrc;

        spinResult.push(choiceItems[index].id);

    })  
    showHeader()
}

function reset() {
    totalCount = 0
    choiceItems.forEach(element => {
        element.count = 0
    })
    chosenItems = []
    showBoard()
}

