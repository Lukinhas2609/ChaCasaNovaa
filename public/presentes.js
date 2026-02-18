// Verifica se o script do Supabase carregou
if (!window.supabase) {
    console.error("Supabase não carregou!");
} else {
    console.log("Supabase carregado com sucesso");
}
const supabase = window.supabaseClient;

const botoes = document.querySelectorAll(".btn-reservar");

botoes.forEach(botao => {
    botao.addEventListener("click", async () => {

        const id = botao.dataset.id;

        const nome = prompt("Digite seu nome para reservar:");

        if (!nome) return;

        const { error } = await supabase
            .from("presentes")
            .update({
                reservado: true,
                reservado_por: nome
            })
            .eq("id", id);

        if (error) {
            alert("Erro ao reservar.");
            console.error(error);
        } else {
            alert("Presente reservado com sucesso!");
            botao.innerText = "Reservado";
            botao.disabled = true;
        }

    });
});