import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountDownContainer, Separator } from "./styles";

export function Countdown() {
const {
activeCycle,
activeCycleId,
setSecondsPassed,
amountSecondsPassed,
markCurrentCycleAsFinished,
} = useContext(CyclesContext);

const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

// calcula a diferença da data atual e o periodo selecionado utilizando o useEffect e o difference do date-fns
// para dar a diferença da data atual no momento da criação do ciclo e a data atual gerada a cada 1 segundo
useEffect(() => {
let interval: number;

if (activeCycle) {
    interval = setInterval(() => {
    const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.startDate
    );

    if (secondsDifference >= totalSeconds + 1) {
        markCurrentCycleAsFinished();
        setSecondsPassed(totalSeconds);
        clearInterval(secondsDifference);
    } else {
        setSecondsPassed(secondsDifference);
    }
    }, 1000);
}
return () => {
    clearInterval(interval);
};
}, [
activeCycle,
activeCycleId,
setSecondsPassed,
markCurrentCycleAsFinished,
]);

const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

const minutesAmount = Math.floor(currentSeconds / 60);
const secondsAmount = currentSeconds % 60;

const minutes = String(minutesAmount).padStart(2, "0");
const seconds = String(secondsAmount).padStart(2, "0");

return (
<CountDownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <Separator>:</Separator>
    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
</CountDownContainer>
);
}
