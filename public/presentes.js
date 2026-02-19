// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";
// 👇 usamos outro nome para evitar conflito
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase carregado:", supabaseClient);

async function reservarPresente(id) {

    const nome = prompt("Digite seu nome:");

    console.log("ID clicado:", id);
    console.log("Nome digitado:", nome);

    const { data, error } = await supabaseClient
        .from("presentes")
        .update({
            disponivel: false,
            nome_reserva: nome
        })
        .eq("id", id)
        .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert("Erro ao reservar.");
        return;
    }

    if (!data || data.length === 0) {
        alert("Nada foi atualizado.");
        return;
    }

    alert("Reservado com sucesso!");
    carregarPresentes();
}
