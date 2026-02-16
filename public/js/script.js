console.log("JS carregado");

// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// ===== Adicionar pessoa =====
function adicionarPessoa() {
    const lista = document.getElementById("lista-pessoas");

    const div = document.createElement("div");
    div.className = "pessoa";
    div.innerHTML = `
        <input type="text" placeholder="Nome">
        <div class="erro"></div>
        <button type="button" class="remover">✕</button>
    `;

    div.querySelector(".remover").addEventListener("click", () => div.remove());

    lista.appendChild(div);
}

// ===== DOM =====
document.addEventListener("DOMContentLoaded", () => {

    const btnAdicionar = document.getElementById("adicionar");
    const btnConfirmar = document.getElementById("confirmar");

    btnAdicionar.addEventListener("click", adicionarPessoa);

    btnConfirmar.addEventListener("click", async () => {

        const pessoasDiv = document.querySelectorAll(".pessoa");
        let valido = true;

        const pessoas = [...pessoasDiv].map(div => {
            const nome = div.querySelector('input[placeholder="Nome"]').value.trim();
            const erro = div.querySelector(".erro");

            erro.textContent = "";

            if (!nome) {
                erro.textContent = "Nome obrigatório";
                valido = false;
            }

            return { nome };
        });

        if (!valido) return;

        if (!confirm("Deseja confirmar a presença?")) return;

        console.log("Enviando:", pessoas);

        const { data, error } = await supabase
            .from("presencas")
            .insert(pessoas)
            .select();

        if (error) {
            console.error("Erro Supabase:", error);
            alert("Erro ao confirmar presença: " + error.message);
            return;
        }

        console.log("Sucesso:", data);

        alert("Presença confirmada com sucesso ❤️");
        window.location.href = "localizacao.html";
    });
});
