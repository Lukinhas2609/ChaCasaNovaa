// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";
// 👇 usamos outro nome para evitar conflito
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase carregado:", window.supabaseClient);

// ===== Carregar lista =====
async function carregarPresentes() {

    const lista = document.getElementById("lista");
    if (!lista) return;

    lista.innerHTML = "<li>Carregando...</li>";

    const { data, error } = await supabaseClient
        .from("presentes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        lista.innerHTML = "<li>Erro ao carregar presentes.</li>";
        return;
    }

    lista.innerHTML = "";

    data.forEach(presente => {

        const li = document.createElement("li");
        li.className = "item-presente";

        if (presente.disponivel === false) {
            li.classList.add("reservado");
        }

        li.innerHTML = `
            <span>${presente.nome_presente}</span>
            <button ${presente.disponivel === false ? "disabled" : ""}>
                ${presente.disponivel === false ? "Reservado" : "Reservar"}
            </button>
        `;

        const botao = li.querySelector("button");

        if (presente.disponivel === true) {
            botao.addEventListener("click", () => reservarPresente(presente.id));
        }

        lista.appendChild(li);
    });
}


// ===== Reservar presente =====
async function reservarPresente(id) {

    const { error } = await supabaseClient
        .from("presentes")
        .update({ 
            disponivel: false
        })
        .eq("id", id);

    if (error) {
        alert("Erro ao reservar presente.");
        console.error(error);
        return;
    }

    alert("Presente reservado com sucesso ❤️");
    carregarPresentes();
}


// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
    carregarPresentes();
});
