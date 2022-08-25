import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function Historty(){


const {cycles}=useContext(CyclesContext)

//console.log(cycles);

    return(
        <HistoryContainer>
            <h1>Meu Histórico</h1>
            {/* <pre> 
                {JSON.stringify(cycles,null,2)}
            </pre> */}
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle=>{
                            return(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate),
                                        {addSuffix:true,locale:ptBR})}</td>
                                    <td>
                                        {cycle.finishedDate && <Status statusColor="green">Concluido</Status>}
                                        {cycle.interruptedDate &&!cycle.finishedDate && <Status statusColor="red">Interrompido</Status>}
                                        {!cycle.interruptedDate && !cycle.finishedDate && <Status statusColor="yellow">Em andamento</Status>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}