import { useState } from "react"

// Componente responsável apenas por capturar os dados da nova tarefa
// e enviar (via callback) para o componente pai adicionar na lista
const FormularioTarefa = ({ aoAdicionarTarefa }) => {

    // Hooks - useState para cada campo do formulário
    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [descricao, setDescricao] = useState("")
    const [prioridade, setPrioridade] = useState("Baixa")

    // Função chamada ao enviar o formulário
    const enviarFormulario = (e) => {
        // Previne o recarregamento da página
        e.preventDefault()

        // Validação simples do campo obrigatório
        if (!nome.trim()) return

        // Monta o objeto da nova tarefa
        const novaTarefa = {
            id: Date.now(),
            nome,
            data,
            descricao,
            prioridade,
            concluida: false,
        }

        // Callback: entrega a nova tarefa para o componente pai (Tarefas.jsx)
        aoAdicionarTarefa(novaTarefa)

        // Limpa os campos após o cadastro
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