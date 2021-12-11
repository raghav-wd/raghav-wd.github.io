import create from 'zustand'

const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  KeyE: 'dance',
  KeyR: 'reset',
  Space: 'jump',
}

const defaultMovement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  voiceline: false,
  dance: false,
  reset: false,
  jump: false,
}

const moveFieldByKey = (key) => keys[key]

const filter = (obj) => {
  const movementKeys = Object.values(obj)
  const trues = movementKeys.filter((item) => item)
  return trues.length <= 2 ? obj : defaultMovement
}

const useStore = create((set) => ({
  movement: defaultMovement,
  setMovementDown: (e) => {
    set((state) => ({
      movement: { ...filter(state.movement), [moveFieldByKey(e.code)]: true },
    }))
  },
  setMovementUp: (e) => {
    set((state) =>
      e !== undefined
        ? {
            movement: { ...state.movement, [moveFieldByKey(e.code)]: false },
          }
        : { movement: defaultMovement }
    )
  },
}))

export default { useStore }
export { useStore }
