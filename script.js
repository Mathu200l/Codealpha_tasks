const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let expr = "";

// update UI
function updateUI() {
  expressionEl.value = expr || "0";
  try {
    let safe = expr.replace(/×/g, "*").replace(/÷/g, "/");
    if (safe) {
      let val = Function("return " + safe)();
      resultEl.textContent = Number.isFinite(val) ? val : "Error";
    } else {
      resultEl.textContent = "0";
    }
  } catch {
    resultEl.textContent = "Error";
  }
}

// button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "clear") {
      expr = "";
    } else if (action === "back") {
      expr = expr.slice(0, -1);
    } else if (action === "equals") {
      try {
        let safe = expr.replace(/×/g, "*").replace(/÷/g, "/");
        expr = String(Function("return " + safe)());
      } catch {
        expr = "";
      }
    } else if (value !== undefined) {
      expr += value;
    }
    updateUI();
  });
});

// keyboard support
window.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    expr += e.key;
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    expr += e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key;
  } else if (e.key === "Backspace") {
    expr = expr.slice(0, -1);
  } else if (e.key === "Enter") {
    try {
      let safe = expr.replace(/×/g, "*").replace(/÷/g, "/");
      expr = String(Function("return " + safe)());
    } catch {
      expr = "";
    }
  } else if (e.key === "Escape") {
    expr = "";
  }
  updateUI();
});

updateUI();