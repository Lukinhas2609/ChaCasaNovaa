document.addEventListener('DOMContentLoaded', () => {

    // Supabase (se usar)
    const supabaseUrl = "https://bxxgjhfvihzxmrzgmcdd.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eGdqaGZ2aWh6eG1yemdtY2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjIwNzEsImV4cCI6MjA4NTgzODA3MX0.ms4_Ngum3_Kf0OxmzmUVhY94j4-h3ZYrQRuu_AGecok"; // coloque sua chave aqui
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
