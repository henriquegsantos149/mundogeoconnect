import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def get_block(start_marker, end_marker):
    start = html.find(start_marker)
    if start == -1: 
        print(f'Start marker not found: {start_marker}')
        return ''
    end = html.find(end_marker, start)
    if end == -1: 
        print(f'End marker not found: {end_marker}')
        return html[start:]
    return html[start:end]

head_and_hero = html[:html.find('<!-- APLICAÇÕES PRÁTICAS -->')]
faq_and_footer = html[html.find('<!-- FAQ -->'):]

aplicacoes = get_block('<!-- APLICAÇÕES PRÁTICAS -->', '    <!-- PÚBLICO ALVO -->')
publico = get_block('<!-- PÚBLICO ALVO -->', '    <!-- PROFESSORES / CREDIBILIDADE -->')
docentes = get_block('<!-- PROFESSORES / CREDIBILIDADE -->', '    <!-- SOBRE O CURSO -->')
sobre = get_block('<!-- SOBRE O CURSO -->', '    <!-- DEPOIMENTOS -->')
depoimentos = get_block('<!-- DEPOIMENTOS -->', '    <!-- AUTORIDADE / O PRÓXIMO PASSO -->')
autoridade = get_block('<!-- AUTORIDADE / O PRÓXIMO PASSO -->', '    <!-- O EVENTO MUNDOGEO 2026 -->')
evento = get_block('<!-- O EVENTO MUNDOGEO 2026 -->', '    <!-- TRANSFORMAÇÃO / HABILIDADES -->')
transformacao = get_block('<!-- TRANSFORMAÇÃO / HABILIDADES -->', '    <!-- MOTIVAÇÃO -->')
por_que = get_block('<!-- MOTIVAÇÃO -->', '    <!-- MATRIZ CURRICULAR -->')
matriz = get_block('<!-- MATRIZ CURRICULAR -->', '    <!-- FAQ -->')

# Fix Matriz closing tags if missing
if '</section>' not in matriz[-50:]:
    matriz += '                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n'

new_body = (
    evento +
    autoridade +
    por_que +
    publico +
    aplicacoes +
    transformacao +
    docentes +
    matriz +
    depoimentos +
    sobre
)

with open('index_new.html', 'w', encoding='utf-8') as f:
    f.write(head_and_hero + new_body + faq_and_footer)

print('Success')
