// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    const presentes = [
        {id:1, nome:'Jogo de facas', escolhido:false},
        {id:2, nome:'Potes de vidro', escolhido:false},
        {id:3, nome:'Tábua de corte', escolhido:false},
        {id:4, nome:'Descanso de panela', escolhido:false},
        {id:5, nome:'Escorredor de louça', escolhido:false},
        {id:6, nome:'Ralador de alimentos / alho', escolhido:false},
        {id:7, nome:'Peneira de inox', escolhido:false},
        {id:8, nome:'Abridor de lata', escolhido:false},
        {id:9, nome:'Formas / assadeiras', escolhido:false},
        {id:10, nome:'Pano de prato', escolhido:false},
        {id:11, nome:'Descascador', escolhido:false},
        {id:12, nome:'Tapete para cozinha', escolhido:false},
        {id:13, nome:'Escorredor de macarrão inox', escolhido:false},
        {id:14, nome:'Jarra de suco', escolhido:false},
        {id:15, nome:'Pano de pia', escolhido:false},
        {id:16, nome:'Copo medidor', escolhido:false},
        {id:17, nome:'Lixeira de chão 10L inox', escolhido:false},
        {id:18, nome:'Cortador de pizza', escolhido:false},
        {id:19, nome:'Seca-salada', escolhido:false},
        {id:20, nome:'Utensílios de cozinha', escolhido:false}
    ];

    const lista = document.getElementById('lista');

    function desenharLista() {
        lista.innerHTML = '';
        presentes.forEach(item => {
            const li = document.createElement('li');

            const spanNome = document.createElement('span');
            spanNome.textContent = item.nome;
            li.appendChild(spanNome);

            if(item.escolhido){
                li.classList.add('reservado');
                spanNome.textContent += ' - Reservado';
            } else {
                const btn = document.createElement('button');
                btn.textContent = 'Reservar';
                btn.addEventListener('click', () => {
                    const nome = prompt('Digite seu nome para reservar o presente:');
                    if(!nome) return;
                    item.escolhido = true;

                    // opcional: salvar no localStorage para persistir
                    localStorage.setItem('presentes', JSON.stringify(presentes));

                    desenharLista();
                });
                li.appendChild(btn);
            }

            lista.appendChild(li);
        });
    }

    // Recupera estado salvo no localStorage
    const stored = localStorage.getItem('presentes');
    if(stored){
        const saved = JSON.parse(stored);
        saved.forEach(p => {
            const found = presentes.find(item => item.id === p.id);
            if(found) found.escolhido = p.escolhido;
        });
    }

    desenharLista();
});
