const supabaseUrl = "https://tkakohssjokjfzdwhbmc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYWtvaHNzam9ramZ6ZHdoYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA0NDMsImV4cCI6MjA4NjgyNjQ0M30.YOY1rmVWZwlAvRB3vTcxjoPpGO6iHEO66CYWlh1CnpU";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

// Verifica se o script do Supabase carregou
if (!window.supabase) {
    console.error("Supabase não carregou!");
} else {
    console.log("Supabase carregado com sucesso");
}
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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