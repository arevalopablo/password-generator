import React, { useState } from 'react'
import { generateChecksObject, generatePassword, isInArray, regexDicider } from '../helper'
import { lowercaseChars, numberChars, paragraphText, symbolChars, uppercaseChars } from '../config'
import Input from '../shared/Input'
import Copy from '../icons/Copy'


const Home = () => {
  const [rangeValue, setRangeValue] = useState(4)
  const [checkValue, setCheckValue] = useState([])
  const [password, setPassword] = useState('')
  const [preview, setPreview] = useState(true)

  const handleRange = (e) => {
    const {value} = e.target
    setRangeValue(value)
  }

  const handleCheck = (e) => {
    const {name} = e.target
    
    if (isInArray(checkValue, name)) {
      handleRemove(name)
    } else {
      handleAdd(name)
    }
  }

  const handleAdd = (name) => {
    setCheckValue([...checkValue, name])
  }

  const handleRemove = (name) => {
    setCheckValue(checkValue.filter((text) => text !== name))
  }

  const acumulador = (arr) => {
    return arr.reduce((acc, curr) => {
      switch (curr) {
        case 'uppercase':
          return acc += uppercaseChars
        case 'lowercase':
          return acc += lowercaseChars  
        case 'numbers':
          return acc += numberChars
        case 'symbols':
          return acc += symbolChars    
      }
    }, '')
  }

  const resultadoAcc = acumulador(checkValue)
  const arrayStrings = resultadoAcc.split('')

  const getPassword = () => {
    setPassword(generatePassword(arrayStrings, rangeValue))
    setPreview(false)
  }

  const res1 = generateChecksObject(checkValue)
  const res2 = regexDicider(res1)
  console.log(res2)

  return (
    <div className='mainContainer'>
      <h1 style={{textAlign: 'center'}}>Password Generator</h1>
      <div className='passwordContainer'>
        <div >
          <h2 style={{textAlign: 'center', padding: '10px 0'}}>{preview ? 'Create your password' : password}</h2>
        </div>
      </div>
      <div>
        <div className='passLengthCtn'>
          <h3>Password length</h3>
          <h3>{rangeValue}</h3>
        </div>
        <form action="">
          <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
            <Input type={'range'} value={rangeValue} min={4} max={12} onChange={handleRange}/>
          </div>
          <div>
            {paragraphText.map((item, index) => (
              <Input key={index} type={'checkbox'} onChange={handleCheck} checked={isInArray(checkValue, item.name)} {...item}/>
            ))}
          </div>
        </form>
        <div className='strengthCtn'>
            <h4>Strength</h4>
            <button disabled={checkValue < 1} onClick={() => getPassword()}>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default Home
