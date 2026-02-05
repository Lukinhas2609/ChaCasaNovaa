document.addEventListener('DOMContentLoaded', () => {

    // Supabase (se usar)
    const supabaseUrl = "https://beditqcysolsxdppnvdz.supabase.co";
    const supabaseKey = "SUA_CHAVE_PUBLICA"; // coloque sua chave aqui
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    function adicionarPessoa() {
        const lista = document.getElementById('lista-pessoas');
        const novaPessoa = document.createElement('div');
        novaPessoa.className = 'pessoa';
        novaPessoa.innerHTML = `
            <input type="text" placeholder="Nome" required>
            <div class="erro"></div>
            <input type="text" placeholder="Sobrenome" required>
            <div class="erro"></div>
            <button type="button" class="remover">✕</button>
        `;
        lista.appendChild(novaPessoa);

        // evento do remover
        novaPessoa.querySelector('.remover').addEventListener('click', () => {
            novaPessoa.remove();
        });
    }

    window.adicionarPessoa = adicionarPessoa;

    const confirmarBtn = document.getElementById('confirmar');
    if(confirmarBtn){
        confirmarBtn.addEventListener('click', () => {
            const pessoas = document.querySelectorAll('#lista-pessoas .pessoa');
            let tudoOk = true;
            pessoas.forEach(p => {
                const inputs = p.querySelectorAll('input');
                const erros = p.querySelectorAll('.erro');
                erros.forEach(e => e.textContent = '');
                if(inputs[0].value.trim() === "") { erros[0].textContent = "Nome obrigatório"; tudoOk = false; }
                if(inputs[1].value.trim() === "") { erros[1].textContent = "Sobrenome obrigatório"; tudoOk = false; }
            });
            if(!tudoOk) return;

            const confirmacao = confirm("Tem certeza que deseja confirmar a presença?");
            if(confirmacao){
                window.location.href = 'localizacao.html';
            }
        });
    }

});
