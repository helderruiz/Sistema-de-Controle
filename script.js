const tbody = document.querySelector('tbody')
const inputDescricao = document.querySelector('#desc')
const inputValor = document.querySelector('#val')
const selectTipo = document.querySelector('#tip')
const btnIncluir = document.querySelector('#btn-incluir')
// const inputKm = document.querySelector('#kms')

const entrada = document.querySelector('.entrada')
const saida = document.querySelector('.saida')
const total = document.querySelector('.total')
// const km = document.querySelector('.km')

let items

btnIncluir.onclick = () =>{
    if (inputDescricao.value ==='' || inputValor.value ==='' ) {
        return alert('Preencha todos os Campos 😜')
    }
    items.push({
        desc: inputDescricao.value,
        val: Math.abs(inputValor.value).toFixed(2),
        // kms: Math.abs(inputKm.value),
        tip: selectTipo.value,
    })

    setItensBD()

    loadItens()

    inputDescricao.value = ''
    inputValor.value = ''
    inputKm.value = ''


}

function deleteItem(index) {  
    items.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="td-desc">${item.desc}</td>
    <td>${item.val}</td>
    <td class="tabela-tipo">${item.tip === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="tabela-acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `
    tbody.appendChild(tr)
}

function loadItens() {
    items = getItensBD()
    tbody.innerHTML = ''

    items.forEach((item, index) => {
        insertItem(item, index)
    });

    getTotals()
}

function getTotals() {
    const novaEntrada = items
    .filter((item) => item.tip ==="Entrada")
    .map((transaction) => Number(transaction.val))
    // console.log(novaEntrada)

    const novaSaida = items
    .filter((item) => item.tip ==="Saída")
    .map((transaction) => Number(transaction.val))
    // console.log(novaSaida)

    const totalEntrada = novaEntrada
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2)

    const totalSaida = Math.abs(
        novaSaida.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2)

    const totalItemsValor = (totalEntrada - totalSaida).toFixed(2)
    // console.log(totalItemsValor)

    // const totalKmRodados = items.reduce((accumulator, km) => accumulator + km["kms"], 0)

    entrada.innerHTML = totalEntrada
    saida.innerHTML = totalSaida
    total.innerHTML = totalItemsValor
    // km.innerHTML = totalKmRodados

    
}

const getItensBD = () => JSON.parse(localStorage.getItem('db_items')) ?? []
const setItensBD = () => localStorage.setItem('db_items', JSON.stringify(items))

loadItens()