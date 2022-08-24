import { createContext, ReactNode, useState } from "react";

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

interface Cycle {
id: string;
task: string;
minutesAmount: number;
startDate: Date;
interruptedDate?: Date;
finishedDate?: Date;
}

interface CyclesContextProviderProps {
children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
children,
}: CyclesContextProviderProps) {
const [cycles, setCycles] = useState<Cycle[]>([]);
const [activeCycleId, setActivedCycleId] = useState<string | null>(null);

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

function setSecondsPassed(seconds: number) {
setAmountSecondsPassed(seconds);
}

function markCurrentCycleAsFinished() {
setCycles((state) =>
    state.map((cycle) => {
    if (cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() };
    } else {
        return cycle;
    }
    })
);
}

function createNewCycle(data: CreateCycleData) {
const id = String(new Date().getTime());

const newCycle: Cycle = {
    id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date(),
};

setCycles((state) => [...state, newCycle]);
setActivedCycleId(id);
setAmountSecondsPassed(0);

//reset();
}

function interruptCurrentCycle() {
setCycles((state) =>
    state.map((cycle) => {
    if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() };
    } else {
        
        return cycle;
    }
    })
);
setActivedCycleId(null);
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
