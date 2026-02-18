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

        if (!presente.disponivel) {
            li.classList.add("reservado");
        }

        li.innerHTML = `
            <span>
                ${presente.nome_presente}
                ${!presente.disponivel && presente.nome_pessoa 
                    ? `<small> (Reservado por ${presente.nome_pessoa})</small>` 
                    : ""}
            </span>
            <button ${!presente.disponivel ? "disabled" : ""}>
                ${!presente.disponivel ? "Reservado" : "Reservar"}
            </button>
        `;

        const botao = li.querySelector("button");

        if (presente.disponivel) {
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
            disponivel: false,
            nome_pessoa: nomePessoa
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