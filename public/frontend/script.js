// ===== SUPABASE =====
const supabaseUrl = "https://pasllgbgvrffylrsvzgo.supabase.co";
const supabaseKey = "sb_publishable_IjrT6_ewTkVnyt54DZvZgA_3vYl3Ok1"; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const LIMITE_PESSOAS = 5;

// ===== Adicionar pessoa =====
function adicionarPessoa() {
    const lista = document.getElementById("lista-pessoas");
    const total = lista.querySelectorAll(".pessoa").length;

    if (total >= LIMITE_PESSOAS) {
        alert(`Máximo de ${LIMITE_PESSOAS} pessoas por confirmação.`);
        return;
    }

    const div = document.createElement("div");
    div.className = "pessoa";
    div.innerHTML = `
        <input type="text" placeholder="Nome">
        <div class="erro"></div>

        <input type="text" placeholder="Sobrenome">
        <div class="erro"></div>

        <button type="button" class="remover">✕</button>
    `;

    lista.appendChild(div);
    div.querySelector(".remover").addEventListener("click", () => div.remove());
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("adicionar").addEventListener("click", adicionarPessoa);

    const btnConfirmar = document.getElementById("confirmar");

    btnConfirmar.addEventListener("click", async () => {

        // evita duplo clique
        if (btnConfirmar.disabled) return;

        const pessoasDiv = document.querySelectorAll("#lista-pessoas .pessoa");

        const pessoas = [...pessoasDiv].map(div => ({
            nome: div.querySelector('input[placeholder="Nome"]').value.trim(),
            sobrenome: div.querySelector('input[placeholder="Sobrenome"]').value.trim()
        }));

        let valido = true;

        pessoas.forEach((p, i) => {
            const erros = pessoasDiv[i].querySelectorAll(".erro");
            erros.forEach(e => e.textContent = "");

            if (!p.nome) { erros[0].textContent = "Nome obrigatório"; valido = false; }
            if (!p.sobrenome) { erros[1].textContent = "Sobrenome obrigatório"; valido = false; }
        });

        if (!valido) return;
        if (!confirm("Confirmar presença?")) return;

        // loading
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "Confirmando...";

        const { error } = await supabase
            .from("presencas")
            .insert(pessoas);

        if (error) {
            console.error(error);
            alert("Erro ao confirmar presença.");
            btnConfirmar.disabled = false;
            btnConfirmar.textContent = "Confirmar Presença";
            return;
        }

        alert("Presença confirmada com sucesso 💙");
        window.location.href = "localizacao.html";
    });
});