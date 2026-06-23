$(document).ready(function(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listaElement = $("#lista");
    const totalElement = $("#total");

    function exibirCarrinho(){
        listaElement.empty();
        let totalPreco = 0;

        $.each(carrinho, function(index, item){
            const listItem = $("<li>").text(`${item.desc} - Preço $${Number(item.preco).toFixed(2)}`);

            const removeButton = $("<button>")
                .text("❌")
                .css("margin-left", "10px")
                .click(function(){
                    removerItem(index);
                });

            listItem.append(removeButton);
            listaElement.append(listItem);

            totalPreco += Number(item.preco) || 0;
        });

        totalElement.text(`Total: $${totalPreco.toFixed(2)}`);
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
    $(listaClone).find("button").remove();
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