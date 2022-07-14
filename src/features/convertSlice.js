import { createSlice } from '@reduxjs/toolkit'

export const convertSlice = createSlice({
  name: 'convert',
  initialState: {
    value: '',
    error: false
  },
  reducers: {
    romanToDecimal: (state, action) => {
      const romanNum = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1
      }

      for (let i = 0; i < action.payload.length; i++) {
        if (!(action.payload[i] in romanNum)) {
          state.error = true
          return
        }
      }
      //
      state.error = false

      const stack = []
      let sum = 0

      for (let i = action.payload.length - 1; i >= 0; i--) {
        if (romanNum[action.payload[i]] < stack[stack.length - 1]) {
          stack[stack.length - 1] =
            stack[stack.length - 1] - romanNum[action.payload[i]]
          sum -=
            stack[stack.length - 1] -
            (stack[stack.length - 1] - romanNum[action.payload[i]])
        } else {
          stack.push(romanNum[action.payload[i]])
          sum += romanNum[action.payload[i]]
        }
      }

      state.value = `${sum}`
    },
    decimalToRoman: (state, action) => {
      if (!Number.isInteger(+action.payload)) {
        state.error = true
        return
      }

      for (let i = 0; i < action.payload.length; i++) {
        if (+action.payload < 1 || +action.payload > 3999) {
          state.error = true
          return
        }
      }

      //
      state.error = false
      
      const romanNum = new Map([
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
      ])
      let result = ''
      let num = +action.payload

      romanNum.forEach((val, key) => {
        let mod = num % val

        if (mod >= 0) {
          let div = parseInt(num / val)

          for (let i = 0; i < div; i++) {
            result += key
          }
          num = mod
        }
      })

      state.value = result
    }
  }
})

export const { romanToDecimal, decimalToRoman } = convertSlice.actions

export default convertSlice.reducer