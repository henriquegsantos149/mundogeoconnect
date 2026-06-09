
const fs = require("fs");
let code = fs.readFileSync("script.js", "utf8");

// Fix 1
code = code.replace(
    /const popupDesconto = document\.getElementById\("popup-desconto"\);\s*const popupCupom = document\.getElementById\("popup-cupom"\);\s*const popupLink = document\.getElementById\("popup-link"\);\s*if \(popupDesconto\) popupDesconto\.innerText = rule\.discountNum;\s*if \(popupCupom\) popupCupom\.innerText = rule\.coupon;\s*if \(popupLink\) popupLink\.href = rule\.link;/g,
    `const popupDesconto = document.getElementById("popup-desconto");\n        const popupBtnDesconto = document.getElementById("popup-btn-desconto");\n\n        if (popupDesconto) popupDesconto.innerText = rule.discountNum;\n        if (popupBtnDesconto) popupBtnDesconto.innerText = rule.discountNum;`
);

// Fix 2
code = code.replace(
    /if \(!sessionStorage\.getItem\("mundogeoPopupClosed"\)\) \{\s*setTimeout\(\(\) => \{\s*popup\.classList\.add\("active"\);\s*\}, 1000\);\s*\}\s*const closePopup = \(e\) => \{\s*if \(e\) e\.preventDefault\(\);\s*popup\.classList\.remove\("active"\);\s*sessionStorage\.setItem\("mundogeoPopupClosed", "true"\);\s*\};\s*if \(closeBtn\) closeBtn\.addEventListener\("click", closePopup\);\s*if \(popupLink\) popupLink\.addEventListener\("click", \(\) => \{\s*closePopup\(\);\s*\}\);/g,
    `setTimeout(() => {\n            popup.classList.add("active");\n        }, 1000);\n\n        const closePopup = (e) => {\n            if (e) e.preventDefault();\n            popup.classList.remove("active");\n        };\n\n        if (closeBtn) closeBtn.addEventListener("click", closePopup);\n        \n        if (popupLink) {\n            popupLink.addEventListener("click", (e) => {\n                closePopup(e);\n            });\n        }`
);

fs.writeFileSync("script.js", code, "utf8");

