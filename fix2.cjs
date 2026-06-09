
const fs = require("fs");
let code = fs.readFileSync("script.js", "utf8");

const startIdx = code.indexOf("// POPUP LOGIC");
if (startIdx !== -1) {
    code = code.substring(0, startIdx) + `// POPUP LOGIC
    const popup = document.getElementById("cupom-popup");
    const closeBtn = document.getElementById("close-popup");
    const popupLink = document.getElementById("popup-link");

    if (popup) {
        setTimeout(() => {
            popup.classList.add("active");
        }, 1000); // Exibir 1 segundo após carregar

        const closePopup = (e) => {
            if (e) e.preventDefault();
            popup.classList.remove("active");
        };

        if (closeBtn) closeBtn.addEventListener("click", closePopup);
        
        if (popupLink) {
            popupLink.addEventListener("click", (e) => {
                closePopup(e);
            });
        }

        popup.addEventListener("click", (e) => {
            if (e.target === popup) closePopup();
        });
    }

})();
`;
}

// Fix popup Cupom update
code = code.replace(
    /const popupCupom = document\.getElementById\("popup-cupom"\);\s*const popupLink = document\.getElementById\("popup-link"\);\s*if \(popupDesconto\) popupDesconto\.innerText = rule\.discountNum;\s*if \(popupCupom\) popupCupom\.innerText = rule\.coupon;\s*if \(popupLink\) popupLink\.href = rule\.link;/g,
    `const popupBtnDesconto = document.getElementById("popup-btn-desconto");\n\n        if (popupDesconto) popupDesconto.innerText = rule.discountNum;\n        if (popupBtnDesconto) popupBtnDesconto.innerText = rule.discountNum;`
);

fs.writeFileSync("script.js", code, "utf8");

