const display = document.getElementById("display");
const backBtn = document.getElementById("back");
const btns = document.querySelectorAll(".btn");
const historyDiv = document.querySelector(".history");
const calc = document.querySelector(".calculator");

const test = [];

const displayArr = JSON.parse(localStorage.getItem("display")) || [];
let currentCalc = {};
let justSolved = false;

const renderCalc = () => {
    const hisHTML = displayArr
        .map(({ expression, answer }) => {
            return `
      <div class="expression" id="${expression}">
        <p><strong>Expression:</strong> ${expression}</p>
        <p><strong>Answer:</strong> ${answer}</p>
        <button onclick="deleteF(this)">Delete</button>
        <button onclick="edit(this)">Edit</button>
      </div>
    `;
        })
        .join("");

    historyDiv.innerHTML = hisHTML;
};

const addOrUpdate = () => {
    historyDiv.classList.toggle("hidden");
    backBtn.classList.toggle("hidden");
    calc.classList.toggle("hidden");

    renderCalc();
};

const deleteF = btn => {
    findArrIndex = displayArr.findIndex(
        calc => calc.expression === btn.parentElement.id
    );

    displayArr.splice(findArrIndex, 1);
    renderCalc();
    localStorage.setItem("display", JSON.stringify(displayArr));
};

const edit = btn => {
    findArrIndex = displayArr.findIndex(
        obj => obj.expression === btn.parentElement.id
    );
    currentCalc = displayArr[findArrIndex];
    display.innerText = currentCalc.expression;
    historyDiv.classList.toggle("hidden");
    backBtn.classList.toggle("hidden");
    calc.classList.toggle("hidden");
};

backBtn.addEventListener("click", () => {
    historyDiv.classList.toggle("hidden");
    calc.classList.toggle("hidden");
    backBtn.classList.toggle("hidden");
});

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.innerText === "=") {
            try {
                display.innerText += "\n" + eval(display.innerText);
                const lines = display.innerText.split("\n");

                const calcObj = {
                    expression: lines[0],
                    answer: lines[1]
                };
                    displayArr.unshift(calcObj)

                localStorage.setItem("display", JSON.stringify(displayArr));
                justSolved = true;
            } catch (Error) {
                display.innerText = "Error";
            }
            return;
        }

        if (btn.innerText === "AC") {
            display.innerText = "";
            return;
        }
        if (btn.innerText === "DEL") {
            display.innerText = display.innerText.slice(0, -1);
            return;
        }

        if (btn.innerText === "HIS") {
            addOrUpdate();
            return;
        }

        if (justSolved) {
            display.innerText = "";
            justSolved = false;
        }

        display.innerText += btn.innerText;
    });
});
