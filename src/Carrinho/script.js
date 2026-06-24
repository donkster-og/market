document.addEventListener("DOMContentLoaded", function(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listaElement = document.getElementById("lista");
    const totalElement = document.getElementById("total");

    function exibirCarrinho(){
        listaElement.innerHTML = "";
        let totalPreco = 0;

        if (carrinho.length === 0) {
            const vazioItem = document.createElement("li");
            vazioItem.textContent = "Carrinho vazio";
            listaElement.appendChild(vazioItem);
            totalElement.textContent = "Total: $0.00";
            return;
        }

        carrinho.forEach(function(item, index){
            const preco = Number(item.preco ?? item.sal ?? 0);
            const listItem = document.createElement("li");
            listItem.textContent = `${item.desc} - Preço $${preco.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "❌";
            removeButton.style.marginLeft = "10px";
            removeButton.addEventListener("click", function(){
                removerItem(index);
            });

            listItem.appendChild(removeButton);
            listaElement.appendChild(listItem);
            totalPreco += preco;
        });

        totalElement.textContent = `Total: $${totalPreco.toFixed(2)}`;
    }

    function removerItem(index){
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();
});

function gerar(){
    const listaElement = document.getElementById("lista");
    const totalElement = document.getElementById("total");
    if(!listaElement || !totalElement) return;

    const listaClone = listaElement.cloneNode(true);
    const buttons = listaClone.querySelectorAll("button");
    buttons.forEach(function(button){
        button.remove();
    });
    const listaHtml = listaClone.innerHTML;
    const totalHtml = totalElement.innerHTML;
    const conteudoHTML = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>Pedido Confirmado</h1>
            <h3>Agradecemos sua compra e sua preferência.</h3>
            <br>
            ${listaHtml}
            <br>
            <br>
            ${totalHtml}
        </body>
    </html>
    `;

    const blob = new Blob([conteudoHTML], {type: "application/msword"});
    const link = document .createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "pedido.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    const pedidoEl = document.getElementById("pedido");
    if (pedidoEl) pedidoEl.style.display = "block";
}

function successClose(){
    const pedidoEl = document.getElementById("pedido");
    if (pedidoEl) pedidoEl.style.display = "none";
}