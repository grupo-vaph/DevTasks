const FiltroTarefas = ({ filtroAtual, aoMudarFiltro }) => {

    const opcoes = [
        { valor: "todas", rotulo: "Todas" },
        { valor: "pendentes", rotulo: "Pendentes" },
        { valor: "concluidas", rotulo: "Concluídas" },
    ]

    return (
        <div className="filtro-tarefas">
            {opcoes.map((opcao) => (
                <button
                    key={opcao.valor}
                    className={filtroAtual === opcao.valor ? "filtro-ativo" : ""}
                    onClick={() => aoMudarFiltro(opcao.valor)}
                >
                    {opcao.rotulo}
                </button>
            ))}
        </div>
    )
}

export default FiltroTarefas