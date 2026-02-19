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
async function reservarPresente(id) {

    const nome = prompt("Digite seu nome para reservar:");

    if (!nome || nome.trim().length < 3) {
        alert("Digite um nome válido.");
        return;
    }
botao.addEventListener("click", () => {
    console.log("Botão clicado", presente.id);
    reservarPresente(presente.id);
});

    const { error } = await supabaseClient
        .from("presentes")
        .update({ 
            disponivel: false,
            nome_reserva: nome.trim()
        })
        .eq("id", id)
        .eq("disponivel", true); // 🔒 evita reserva dupla

    if (error) {
        alert("Erro ao reservar presente.");
        console.error(error);
        return;
    }

    alert("Presente reservado com sucesso ❤️");
    carregarPresentes();
}
