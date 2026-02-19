// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";
// 👇 usamos outro nome para evitar conflito
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase carregado:", window.supabaseClient);

// Verifica se o script do Supabase carregou
if (!window.supabase) {
    console.error("Supabase não carregou!");
} else {
    console.log("Supabase carregado com sucesso");
}

// ===== DOM =====
document.addEventListener("DOMContentLoaded", () => {

    const btnReservar = document.getElementById("reservar");

    if (!btnReservar) return;

    btnReservar.addEventListener("click", async () => {

        const nomePresente = btnReservar.dataset.presente;
        const nomePessoa = prompt("Digite seu nome para reservar:");

        if (!nomePessoa || nomePessoa.trim().length < 3) {
            alert("Digite um nome válido.");
            return;
        }

        if (!confirm("Deseja reservar este presente?")) return;

        btnReservar.disabled = true;
        btnReservar.textContent = "Reservando...";

        try {
            const { data, error } = await supabaseClient
                .from("presentes")
                .update({
                    nome_pessoa: nomePessoa.trim(),
                    disponivel: false
                })
                .eq("nome_presente", nomePresente)
                .eq("disponivel", true)
                .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                alert("Este presente já foi reservado.");
                btnReservar.disabled = true;
                btnReservar.textContent = "Indisponível";
                return;
            }

            alert("Presente reservado com sucesso ❤️");

            btnReservar.textContent = "Reservado";
            btnReservar.disabled = true;

        } catch (error) {
            console.error("Erro Supabase:", error);
            alert("Erro ao reservar presente.");

            btnReservar.disabled = false;
            btnReservar.textContent = "Reservar";
        }
    });

});
