// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// ===== Carregar Presentes =====
async function carregarPresentes() {
    const container = document.getElementById("lista-presentes");
    if (!container) return;

    container.innerHTML = "Carregando...";

    const { data, error } = await supabaseClient
        .from("presentes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        container.innerHTML = "Erro ao carregar presentes.";
        return;
    }

    container.innerHTML = "";

    data.forEach(presente => {

        const card = document.createElement("div");
        card.className = "card-presente";

        card.innerHTML = `
            <img src="${presente.imagem || 'foto.jpg'}" alt="${presente.nome}">
            <h3>${presente.nome}</h3>
            <p>${presente.descricao || ""}</p>
            <button ${presente.reservado ? "disabled" : ""}>
                ${presente.reservado ? "Reservado" : "Reservar"}
            </button>
        `;

        const btn = card.querySelector("button");

        if (!presente.reservado) {
            btn.addEventListener("click", () => reservarPresente(presente.id));
        }

        container.appendChild(card);
    });
}

// ===== Reservar Presente =====
async function reservarPresente(id) {

    if (!confirm("Deseja reservar este presente?")) return;

    const { error } = await supabaseClient
        .from("presentes")
        .update({ reservado: true })
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Erro ao reservar presente.");
        return;
    }

    alert("Presente reservado com sucesso ❤️");

    carregarPresentes();
}

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
});
