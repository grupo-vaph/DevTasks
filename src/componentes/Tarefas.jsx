import { useState, useEffect } from "react"
import FormularioTarefa from "./FormularioTarefa"
import ItemTarefa from "./ItemTarefa"
import FiltroTarefas from "./FiltroTarefas"
import '../css/style.css'

// Componente "container": guarda o estado principal da aplicação
// e coordena os componentes filhos (Formulario, Item, Filtro)
const Tarefas = () => {

    // HOOK useState - inicializa a lista de tarefas lendo do localStorage
    // (função de inicialização "preguiçosa": só roda uma vez, na primeira renderização)
    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("dev-tarefas")
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : []
    })

    // HOOK useState - controla qual filtro está ativo
    const [filtro, setFiltro] = useState("todas")

    // HOOK useEffect - efeito colateral: toda vez que "tarefas" mudar,
    // salva a lista atualizada no localStorage
    useEffect(() => {
        localStorage.setItem("dev-tarefas", JSON.stringify(tarefas))
    }, [tarefas])

    // Callback passado para o FormularioTarefa
    // Adiciona a nova tarefa no final da lista, mantendo as antigas (spread)
    const adicionarTarefa = (novaTarefa) => {
        setTarefas([...tarefas, novaTarefa])
    }

    // Callback passado para o ItemTarefa
    // Usa .map() para percorrer a lista e inverter o status "concluida"
    // apenas da tarefa com o id correspondente
    const concluirTarefa = (id) => {
        const tarefasAtualizadas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
        )
        setTarefas(tarefasAtualizadas)
    }

    // Callback passado para o ItemTarefa
    // Usa .filter() para gerar uma nova lista sem a tarefa removida
    const removerTarefa = (id) => {
        const tarefasRestantes = tarefas.filter((tarefa) => tarefa.id !== id)
        setTarefas(tarefasRestantes)
    }

    // Usa .filter() novamente para decidir quais tarefas exibir,
    // de acordo com o filtro selecionado (Todas / Pendentes / Concluídas)
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") return !tarefa.concluida
        if (filtro === "concluidas") return tarefa.concluida
        return true // "todas"
    })

    return (
        <div className="app-container">
            <h1>Lista de Tarefas do Programador</h1>

            <FormularioTarefa aoAdicionarTarefa={adicionarTarefa} />

            <FiltroTarefas filtroAtual={filtro} aoMudarFiltro={setFiltro} />

            <ul className="lista-tarefas">
                {/* .map() percorre as tarefas já filtradas e renderiza um ItemTarefa para cada uma */}
                {tarefasFiltradas.map((tarefa) => (
                    <ItemTarefa
                        key={tarefa.id}
                        tarefa={tarefa}
                        aoConcluir={concluirTarefa}
                        aoRemover={removerTarefa}
                    />
                ))}
            </ul>

            {tarefasFiltradas.length === 0 && (
                <p className="mensagem-vazia">Nenhuma tarefa encontrada</p>
            )}
        </div>
    )
}

export default Tarefas