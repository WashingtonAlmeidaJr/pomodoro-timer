import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";

interface CreateCycleData {
task: string;
minutesAmount: number;
}

interface CyclesContextType {
cycles: Cycle[];
activeCycle: Cycle | undefined;
activeCycleId: String | null;
amountSecondsPassed: number;
markCurrentCycleAsFinished: () => void;
setSecondsPassed: (seconds: number) => void;
createNewCycle: (data: CreateCycleData) => void;
interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
children: ReactNode;
}

export function CyclesContextProvider({
children,
}: CyclesContextProviderProps) {

const [cyclesState, dispatch] = useReducer(cyclesReducers,{
    cycles:[],
    activeCycleId:null
},

()=>{
    const storageStateAsJSON=localStorage.getItem('@ignite-time:cycles-state-1.0')
    if(storageStateAsJSON){
        return JSON.parse(storageStateAsJSON)
    }
}
)

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

useEffect(()=>{
    const stateJSON=JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-time:cycles-state-1.0',stateJSON)
},[cyclesState])


const {cycles,activeCycleId}=cyclesState
const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


function setSecondsPassed(seconds: number) {
setAmountSecondsPassed(seconds)
}

function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
}

function createNewCycle(data: CreateCycleData) {
const id = String(new Date().getTime());

const newCycle: Cycle = {
    id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
};

dispatch(addNewCycleAction(newCycle))
}

function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
}

return (
<CyclesContext.Provider
    value={{
    cycles,
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
    createNewCycle,
    interruptCurrentCycle,
    }}
>
    {children}
</CyclesContext.Provider>
);
}
