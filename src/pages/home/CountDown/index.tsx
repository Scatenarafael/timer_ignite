import { differenceInSeconds } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { CycleContext } from '../../../contexts/CyclesContext'
import {
  ActionTypes,
  markCurrentCycleAsFinishedAction,
  setSecondsPassedAction,
} from '../../../reducers/cycles/actions'
import { CountDownContainer, Separator } from './styles'

// >>>>>>>>>>>> Voltar as funções pro contexto e colocar o dispatch por la (verificar no curso se ele faz assim) <<<<<<<<<<<

export function CountDown() {
  const { state, dispatch } = useContext(CycleContext)

  const activeCycle = state.cycles.find((cycle) => {
    return cycle.id === state.activeCycleId
  })
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          dispatch(markCurrentCycleAsFinishedAction())
          dispatch(setSecondsPassedAction(totalSeconds))
          clearInterval(interval)
        } else {
          dispatch(setSecondsPassedAction(secondsDifference))
          console.log('dispatch(SET_SECONDS_PASSED) >> state: ', state)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, state.activeCycleId])

  const currentSeconds = activeCycle
    ? totalSeconds - state.amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)

  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
