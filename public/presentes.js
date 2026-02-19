
alert("JS carregou");
// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";
// 👇 usamos outro nome para evitar conflito
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase carregado:", supabaseClient);

// ===== Reservar presente =====
async function reservarPresente(nome_reserva) {


  const nome = prompt("Digite seu nome para reservar:");
    if (!nome || nome.trim().length < 3) {
        alert("Digite um nome válido.");
        return;
    }

    const { data, error } = await supabaseClient
        .from("presentes")
        .update({
            disponivel: false,
            nome_pessoa: nome.trim()
        })
        .eq("nome_presente", nomePresente)
        .eq("disponivel", true)
        .select();

    if (error) {
        console.error(error);
        alert("Erro ao reservar.");
        return;
    }

    if (!data || data.length === 0) {
        alert("Este presente já foi reservado.");
        return;
    }

    alert("Presente reservado com sucesso ❤️");
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-reservar").forEach(botao => {
        botao.addEventListener("click", () => {
            reservarPresente(botao.dataset.presente);
        });
    });
});