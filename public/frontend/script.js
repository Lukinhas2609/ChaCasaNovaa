    // Supabase (se usar)
    const supabaseUrl = "https://bxxgjhfvihzxmrzgmcdd.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eGdqaGZ2aWh6eG1yemdtY2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjIwNzEsImV4cCI6MjA4NTgzODA3MX0.ms4_Ngum3_Kf0OxmzmUVhY94j4-h3ZYrQRuu_AGecok"; // coloque sua chave aqui
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ===== FUNÇÃO PARA ADICIONAR PESSOA =====
function adicionarPessoa() {
    const lista = document.getElementById("lista-pessoas");
    const div = document.createElement("div");
    div.className = "pessoa";
    div.innerHTML = `
        <input type="text" placeholder="Nome" required>
        <div class="erro"></div>
        <input type="text" placeholder="Sobrenome" required>
        <div class="erro"></div>
        <button type="button" class="remover">✕</button>
    `;
    lista.appendChild(div);

    // Evento do botão remover
    div.querySelector(".remover").addEventListener("click", () => div.remove());
}

// ===== CONFIGURA EVENTOS QUANDO A PÁGINA CARREGAR =====
document.addEventListener("DOMContentLoaded", () => {
    // Remover primeira pessoa
    const primeiraRemover = document.querySelector("#lista-pessoas .pessoa .remover");
    primeiraRemover.addEventListener("click", () => primeiraRemover.parentElement.remove());

    // Botão Confirmar Presença
    document.getElementById("confirmar").addEventListener("click", async () => {
        const pessoas = [...document.querySelectorAll("#lista-pessoas .pessoa")].map(div => ({
            nome: div.querySelector('input[placeholder="Nome"]').value.trim(),
            sobrenome: div.querySelector('input[placeholder="Sobrenome"]').value.trim()
        }));

        // ===== VALIDAÇÃO =====
        let tudoOk = true;
        pessoas.forEach((pessoa, index) => {
            const div = document.querySelectorAll("#lista-pessoas .pessoa")[index];
            const erros = div.querySelectorAll(".erro");
            erros.forEach(e => e.textContent = "");
            if (!pessoa.nome) { erros[0].textContent = "Nome obrigatório"; tudoOk = false; }
            if (!pessoa.sobrenome) { erros[1].textContent = "Sobrenome obrigatório"; tudoOk = false; }
        });
        if (!tudoOk) return;

        // ===== CONFIRMAÇÃO =====
        if (!confirm("Tem certeza que deseja confirmar a presença?")) return;

        // ===== ENVIO PARA SUPABASE =====
        const { error } = await supabase.from("presencas").insert(pessoas);

        if (error) {
            console.error(error);
            alert("Erro ao salvar no banco!");
        } else {
            alert("Presença confirmada!");
            window.location.href = "localizacao.html";
        }
    });
});