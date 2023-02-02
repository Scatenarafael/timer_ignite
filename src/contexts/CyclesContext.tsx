import {
  createContext,
  Dispatch,
  ReactNode,
  ReducerAction,
  useReducer,
} from 'react'
import { cyclesReducer, CyclesState } from '../reducers/cycles/reducer'

// interface CreateCycleData {
//   task: string
//   minutesAmount: number
// }

interface CyclesContextType {
  state: CyclesState
  dispatch: Dispatch<ReducerAction<any>>
}

export const CycleContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [state, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
    amountSecondsPassed: 0,
  })

  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CycleContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
