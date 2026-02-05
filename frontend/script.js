const slug = "cha-da-emilly"; // slug da lista


fetch(`http://localhost:3000/listas/${slug}`)
.then(res => res.json())
.then(data => {
document.getElementById("titulo").innerText = data.lista.titulo;

const supabaseUrl = "https://beditqcysolsxdppnvdz.supabase.co";
const supabaseKey = "sb_publishable_KTDRRy9tBFfTDLDT0bt3VA_HTjVurnB";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("formPresenca").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;

    const { error } = await supabase
        .from("presencas")
        .insert([{ nome, sobrenome }]);

    if (error) {
        alert("Erro ao confirmar presença");
        console.error(error);
    } else {
        alert("Presença confirmada com sucesso!");
    }
});



const ul = document.getElementById("lista");


data.presentes.forEach(p => {
const li = document.createElement("li");
li.innerText = p.nome;


if (p.reservado) {
li.classList.add("reservado");
}


ul.appendChild(li);
});
});