import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod"; /*biblioteca de validação de dados*/
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { HomeContainer } from "./styles";
import {
StartCountDownButton,
StopCountDownButton,
} from "./components/Countdown/styles";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidateSchema = zod.object({
task: zod.string().min(1, "informe a tarefa"),
minutesAmount: zod.number().min(5).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidateSchema>;

export function Home() {

const {activeCycle,createNewCycle,interruptCurrentCycle}=useContext(CyclesContext)


const newCycleForm = useForm<newCycleFormData>({
resolver: zodResolver(newCycleFormValidateSchema),
defaultValues: {
    task: "",
    minutesAmount: 0,
},
});

const { handleSubmit, watch, reset } = newCycleForm;

function handleCreateNewCycle (data:newCycleFormData){
    createNewCycle(data)
    reset()
}

const task = watch("task");
const isSubmitDisabled = !task;

return (
<HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
        <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
        <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
        <HandPalm size={24} />
        Interromper
        </StopCountDownButton>
    ) : (
        <StartCountDownButton
        disabled={isSubmitDisabled}
        type="submit"
        >
        <Play size={24} />
        Começar
        </StartCountDownButton>
    )}
    {/* {activeCycle ? (
        <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
        <HandPalm size={24} />
        Interromper
        </StopCountDownButton>
    ) : (
        <StartCountDownButton
        disabled={isSubmitDisabled}
        type="submit"
        >
        <Play size={24} />
        Começar
        </StartCountDownButton>
    )} */}
    </form>
</HomeContainer>
);
}
