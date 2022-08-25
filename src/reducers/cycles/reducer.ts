import { ActionTypes } from "./actions";
import {produce} from'immer'


export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
    }

export interface CycleState{
    cycles:Cycle[],
    activeCycleId:string|null
}

export function cyclesReducers(state:CycleState,action:any){
            switch(action.type){
                case ActionTypes.ADD_NEW_CYCLE:
                    //utilizando a biblioteca immer
                    return produce(state,draft=>{
                        draft.cycles.push(action.payload.newCycle)
                        draft.activeCycleId=action.payload.newCycle.id
                    })
                case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
                    const currentCycleIndex=state.cycles.findIndex((cycle)=>{
                        return cycle.id===state.activeCycleId
                    })

                    if(currentCycleIndex<0){
                        return state
                    }


                    return produce(state,draft=>{
                        draft.activeCycleId=null
                        draft.cycles[currentCycleIndex].interruptedDate=new Date()
                    })
                    // return 
                    // {
                    //     ...state,
                    //     cycle:state.cycles.map((cycle) => {
                    //         if (cycle.id === state.activeCycleId) {
                    //             return { ...cycle, interruptedDate: new Date() };
                    //         } else {
                    //             return cycle;
                    //         }
                    //     }
                    // ),
                    //     activeCycleId:null
                    // }
                }
                case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
                {
                    const currentCycleIndex=state.cycles.findIndex((cycle)=>{
                        return cycle.id===state.activeCycleId
                    })
                    if(currentCycleIndex<0){
                        return state
                    }
                    return produce(state,draft=>{
                        draft.activeCycleId=null
                        draft.cycles[currentCycleIndex].finishedDate=new Date()
                    })
                }
                default:
                    return state
                }
            }