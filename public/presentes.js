// ===== SUPABASE =====
const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

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

        if (presente.reservado) {
            li.classList.add("reservado");
        }

        li.innerHTML = `
            <span>
                ${presente.nome}
                ${presente.reservado && presente.reservado_por 
                    ? `<small> (Reservado por ${presente.reservado_por})</small>` 
                    : ""}
            </span>
            <button ${presente.reservado ? "disabled" : ""}>
                ${presente.reservado ? "Reservado" : "Reservar"}
            </button>
        `;

        const botao = li.querySelector("button");

        if (!presente.reservado) {
            botao.addEventListener("click", () => reservarPresente(presente.id));
        }

        lista.appendChild(li);
    });
}

// ===== Reservar presente =====
async function reservarPresente(id) {

    const nomePessoa = prompt("Digite seu nome para reservar:");

    if (!nomePessoa) return;

    const { error } = await supabaseClient
        .from("presentes")
        .update({ 
            reservado: true,
            reservado_por: nomePessoa
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