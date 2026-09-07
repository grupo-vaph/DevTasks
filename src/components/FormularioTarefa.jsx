import { useState } from "react"

const FormularioTarefa = ({ aoAdicionarTarefa }) => {

    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [descricao, setDescricao] = useState("")
    const [prioridade, setPrioridade] = useState("Baixa")

    const enviarFormulario = (e) => {
        e.preventDefault()

        if (!nome.trim()) return

        const novaTarefa = {
            id: Date.now(),
            nome,
            data,
            descricao,
            prioridade,
            concluida: false,
        }

        aoAdicionarTarefa(novaTarefa)

        setNome("")
        setData("")
        setDescricao("")
        setPrioridade("Baixa")
    }

    return (
        <form className="form-tarefa" onSubmit={enviarFormulario}>
            <input
                type="text"
                placeholder="Nome da tarefa"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />

            <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
            >
                <option value="Baixa">Prioridade Baixa</option>
                <option value="Media">Prioridade Média</option>
                <option value="Alta">Prioridade Alta</option>
            </select>

            <button type="submit">Adicionar Tarefa</button>
        </form>
    )
}

export default FormularioTarefa