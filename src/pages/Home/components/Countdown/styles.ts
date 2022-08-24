import styled from 'styled-components'

export const CountDownContainer=styled.div`
font-family: 'Roboto Mono',monospace;
font-size:10rem;
line-height:8rem;

display: flex;
gap:1rem;
span{
    background-color:${props=>props.theme['gray-700']};
    padding: 2rem 3rem;
    border-radius: 8px;
}
`
export const Separator=styled.div`
padding:2rem 0;
color:${props=>props.theme['green-500']};
width: 4rem;
overflow: hidden;
display:flex;
justify-content: center;
`



export const BaseCountDownButton=styled.button`
    width:100%;
    border:0;
    padding: 1rem;
    border-radius: 8px;
    
    display:flex;
    align-items: center;
    justify-content: center;

    gap:0.5rem;
    font-weight: bold;
    cursor:pointer;

    color: ${props=>props.theme['gray-100']};

    `

export const StartCountDownButton=styled(BaseCountDownButton)`
    background: ${props=>props.theme['green-500']};
    
    &:disabled{
        opacity:0.7;
        cursor:not-allowed;
    }
    
    &:not(:disabled):hover{
        background: ${props=>props.theme['green-300']};
    }
    
    `
export const StopCountDownButton=styled(BaseCountDownButton)`
background: ${props=>props.theme['red-700']};

&:not(:disabled):hover{
    background: ${props=>props.theme['red-500']};
}
`