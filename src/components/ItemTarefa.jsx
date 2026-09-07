const ItemTarefa = ({ tarefa, aoConcluir, aoRemover }) => {

    return (
        <li className={`item-tarefa prioridade-${tarefa.prioridade.toLowerCase()} ${tarefa.concluida ? "concluida" : ""}`}>
            <div className="item-tarefa-info">
                <div className="item-tarefa-cabecalho">
                    <span className="item-tarefa-nome">{tarefa.nome}</span>
                    <span className="item-tarefa-prioridade">{tarefa.prioridade}</span>
                </div>

                {tarefa.data && (<span className="item-tarefa-data">{tarefa.data}</span>)}

                {tarefa.descricao && (<p className="item-tarefa-descricao">{tarefa.descricao}</p>)}
            </div>

            <div className="item-tarefa-acoes">
                <button onClick={() => aoConcluir(tarefa.id)}>{tarefa.concluida ? "Reabrir" : "Concluir"}</button>
                <button onClick={() => aoRemover(tarefa.id)}>Excluir</button>
            </div>
        </li>
    )
}

export default ItemTarefa