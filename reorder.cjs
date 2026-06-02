const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

function getBlock(startMarker, endMarker) {
    const start = html.indexOf(startMarker);
    if (start === -1) {
        console.log("Missing start:", startMarker.trim());
        return "";
    }
    const end = html.indexOf(endMarker, start);
    if (end === -1) {
        console.log("Missing end:", endMarker.trim());
        return html.substring(start);
    }
    return html.substring(start, end);
}

// Ensure proper spacing and line breaks
const headAndHero = html.substring(0, html.indexOf('    <!-- APLICAÇÕES PRÁTICAS -->'));
const faqAndFooter = html.substring(html.indexOf('    <!-- FAQ -->'));

const aplicacoes = getBlock('    <!-- APLICAÇÕES PRÁTICAS -->', '\n\n    <!-- PÚBLICO ALVO -->');
const publico = getBlock('    <!-- PÚBLICO ALVO -->', '\n\n    <!-- PROFESSORES / CREDIBILIDADE -->');
const docentes = getBlock('    <!-- PROFESSORES / CREDIBILIDADE -->', '\n\n    <!-- SOBRE O CURSO -->');
const sobre = getBlock('    <!-- SOBRE O CURSO -->', '\n\n    <!-- DEPOIMENTOS -->');
const depoimentos = getBlock('    <!-- DEPOIMENTOS -->', '\n\n    <!-- AUTORIDADE / O PRÓXIMO PASSO -->');
const autoridade = getBlock('    <!-- AUTORIDADE / O PRÓXIMO PASSO -->', '\n\n    <!-- O EVENTO MUNDOGEO 2026 -->');
const evento = getBlock('    <!-- O EVENTO MUNDOGEO 2026 -->', '\n\n    <!-- TRANSFORMAÇÃO / HABILIDADES -->');
const transformacao = getBlock('    <!-- TRANSFORMAÇÃO / HABILIDADES -->', '\n\n    <!-- MOTIVAÇÃO -->');
const porQue = getBlock('    <!-- MOTIVAÇÃO -->', '\n\n    <!-- MATRIZ CURRICULAR -->');
let matriz = getBlock('    <!-- MATRIZ CURRICULAR -->', '\n\n    <!-- FAQ -->');

if (!matriz.includes('</section>')) {
    matriz += '\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>';
}

const newBody = 
    evento + '\n\n' +
    autoridade + '\n\n' +
    porQue + '\n\n' +
    publico + '\n\n' +
    aplicacoes + '\n\n' +
    transformacao + '\n\n' +
    docentes + '\n\n' +
    matriz + '\n\n' +
    depoimentos + '\n\n' +
    sobre + '\n\n';

fs.writeFileSync('index.html', headAndHero + newBody + faqAndFooter, 'utf8');
console.log('Reordered successfully.');
