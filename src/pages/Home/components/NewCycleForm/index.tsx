import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { CyclesContext } from "../../../../contexts/CyclesContext"
import { FormContainer, MinutesAmount, TaskInput } from "./styles"


export function NewCycleForm (){


    const {activeCycle} =useContext(CyclesContext)
    const {register}=useFormContext()

    return(
    <FormContainer>
        <label htmlFor="task">Vou trabalhar em: </label>
        <TaskInput
        id="task"
        list="taskSuggestions"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register("task")}
        />

        <datalist id="taskSuggestions"></datalist>

        <label htmlFor="minutesAmount">Vou trabalhar em: </label>
        <MinutesAmount
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
        />

        <span>minutos.</span>
    </FormContainer>
    )

}