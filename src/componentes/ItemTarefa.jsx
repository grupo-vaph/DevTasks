// Componente responsável por exibir UMA tarefa da lista
// Recebe a tarefa e duas funções (callbacks) vindas do componente pai:
// - aoConcluir: marca/desmarca a tarefa como concluída
// - aoRemover: remove a tarefa da lista
const ItemTarefa = ({ tarefa, aoConcluir, aoRemover }) => {

    return (
        <li className={`item-tarefa prioridade-${tarefa.prioridade.toLowerCase()} ${tarefa.concluida ? "concluida" : ""}`}>
            <div className="item-tarefa-info">
                <div className="item-tarefa-cabecalho">
                    <span className="item-tarefa-nome">{tarefa.nome}</span>
                    <span className="item-tarefa-prioridade">{tarefa.prioridade}</span>
                </div>

                {tarefa.data && (
                    <span className="item-tarefa-data">📅 {tarefa.data}</span>
                )}

                {tarefa.descricao && (
                    <p className="item-tarefa-descricao">{tarefa.descricao}</p>
                )}
            </div>

            <div className="item-tarefa-acoes">
                {/* Callback: avisa o componente pai que essa tarefa (pelo id) deve mudar de status */}
                <button onClick={() => aoConcluir(tarefa.id)}>
                    {tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                {/* Callback: avisa o componente pai que essa tarefa (pelo id) deve ser removida */}
                <button onClick={() => aoRemover(tarefa.id)}>
                    Excluir
                </button>
            </div>
        </li>
    )
}

export default ItemTarefa