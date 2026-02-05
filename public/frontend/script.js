document.addEventListener('DOMContentLoaded', () => {

    const supabaseUrl = "https://beditqcysolsxdppnvdz.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZGl0cWN5c29sc3hkcHBudmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDIyNDAsImV4cCI6MjA4NTgxODI0MH0.LHG8VYKmFaE3qwtE81s37UAiGYeI6-xbiZvHS8LNaNA";

    // Cria o client Supabase (garantindo que o script do Supabase foi carregado antes)
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    function adicionarPessoa() {
        const lista = document.getElementById('lista-pessoas');
        if(!lista) return;
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

        // Adiciona evento do botão remover
        novaPessoa.querySelector('.remover').addEventListener('click', () => {
            novaPessoa.remove();
        });
    }

    const confirmarBtn = document.getElementById('confirmar');
    if(confirmarBtn) {
        confirmarBtn.addEventListener('click', () => {
            const pessoas = document.querySelectorAll('#lista-pessoas .pessoa');
            let tudoOk = true;

            pessoas.forEach((pessoa) => {
                const inputs = pessoa.querySelectorAll('input');
                const erros = pessoa.querySelectorAll('.erro');
                erros.forEach(e => e.textContent = '');

                if(inputs[0].value.trim() === "") { erros[0].textContent = "Nome obrigatório"; tudoOk = false; }
                if(inputs[1].value.trim() === "") { erros[1].textContent = "Sobrenome obrigatório"; tudoOk = false; }
            });

            if(!tudoOk) return;

            const confirmacao = confirm("Tem certeza que deseja confirmar a presença?");
            if(confirmacao) {
                window.location.href = 'localizacao.html';
            }
        });
    }

    // Expondo globalmente para HTML
    window.adicionarPessoa = adicionarPessoa;

});
