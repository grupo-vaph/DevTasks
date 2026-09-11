import { useState, useEffect } from "react"
import FormularioTarefa from "./FormularioTarefa"
import ItemTarefa from "./ItemTarefa"
import FiltroTarefas from "./FiltroTarefas"
import '../css/style.css'

const Tarefas = () => {

    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem("dev-tarefas")
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : []
    })

    const [filtro, setFiltro] = useState("todas")

    useEffect(() => {
        localStorage.setItem("dev-tarefas", JSON.stringify(tarefas))
    }, [tarefas])

    const adicionarTarefa = (novaTarefa) => {
        setTarefas([...tarefas, novaTarefa])
    }

    const concluirTarefa = (id) => {
        const tarefasAtualizadas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
        )
        setTarefas(tarefasAtualizadas)
    }

    const removerTarefa = (id) => {
        const tarefasRestantes = tarefas.filter((tarefa) => tarefa.id !== id)
        setTarefas(tarefasRestantes)
    }

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") return !tarefa.concluida
        if (filtro === "concluidas") return tarefa.concluida
        return true
    })

    return (
        <div className="app-container">
            <h1>Lista de Tarefas do Programador</h1>

            <FormularioTarefa aoAdicionarTarefa={adicionarTarefa} />

            <FiltroTarefas filtroAtual={filtro} aoMudarFiltro={setFiltro} />

            <ul className="lista-tarefas">
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