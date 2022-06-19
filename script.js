import { getCaretPosition, setCursorPosition, insert, ctg, sec, csec, cosEval, sinEval, tanEval, ctgEval, secEval, csecEval, signs, allowedSymbols, gamma, intFactorial, floatFactorial, lg, advancedBtns} from "./helpers.js"

const endResult = document.getElementById('end-result')
const simpleButtons = document.querySelectorAll('#simple-num')
const advancedButtons = document.querySelectorAll('#advanced-btn') 
const cleanAll = document.getElementById('clean-all')
const deleteChar = document.getElementById('delete-char')
const evaluation = document.getElementById('evaluation')
const btn = document.getElementById('btn')
let calculation = ''

String.prototype.insert = insert
Math.ctg = ctg
Math.sec = sec
Math.csec = csec
Math.lg = lg
console.log(Math.lg(4,16))
simpleButtons.forEach(btn => {
    btn.addEventListener('click', ()=> {
        if (btn.textContent !== '=') {
            let caretPos = getCaretPosition(endResult)
            endResult.textContent = endResult.textContent.insert(caretPos, btn.textContent)
            console.log(caretPos)
            setCursorPosition(endResult, caretPos+1)
        } else {
            calcParser(endResult.textContent)
        }
    })

})

advancedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (advancedBtns.indexOf(btn.textContent) !== -1) {
            let caretPos = getCaretPosition(endResult)
            endResult.textContent = endResult.textContent.insert(caretPos, btn.textContent.concat('()'))
            console.log(caretPos)
            if (btn.textContent.length === 3) setCursorPosition(endResult, caretPos+4)
            if (btn.textContent.length === 2) setCursorPosition(endResult, caretPos+3)
            if (btn.textContent.length === 4) setCursorPosition(endResult, caretPos+5)
        } else {
            let caretPos = getCaretPosition(endResult)
            if (btn.textContent === '^') {
                endResult.textContent = endResult.textContent.insert(caretPos, '**')
                setCursorPosition(endResult, caretPos+2)
            } else { 
                endResult.textContent = endResult.textContent.insert(caretPos, btn.textContent)
                setCursorPosition(endResult, caretPos+1)
            }
            console.log(caretPos)
        }
    })
})

// functionality (, ), mod, ! , pi, e, ln, log, 6 trigo, ^, sqrt   
let typedChars = []
endResult.addEventListener('keypress', (e) => {
    // console.log(e.key)
    typedChars.push(e.key)
    if (allowedSymbols.indexOf(e.key) === -1) {
        e.preventDefault()
    }

    if(e.key === '=') {
        e.preventDefault()
        calcParser(endResult.textContent)
    }

    if (signs.indexOf(e.key) !== -1 && signs.indexOf(endResult.textContent[getCaretPosition(endResult)-1]) !== -1) {
        e.preventDefault()
    }
    eval(cosEval)
    eval(sinEval)
    eval(tanEval)
    eval(ctgEval)
    eval(secEval)
    eval(csecEval)
    
})

const calcParser = () => {
    // todo заменть все вхождения строки на подстроку искользую replaceAll
    calculation = endResult.textContent.replaceAll('cos', 'Math.cos').replaceAll('sin', 'Math.sin').replaceAll('tan', 'Math.tan').replaceAll('ctg', 'Math.ctg').replaceAll('sec', 'Math.sec').replaceAll('csec', 'Math.csec')
    evaluation.textContent = endResult.textContent
    endResult.textContent = eval(calculation)
    setCursorPosition(endResult, endResult.textContent.length)
    typedChars = []
}

cleanAll.addEventListener('click', () => {
    evaluation.textContent = ''
    endResult.textContent = ''
    calculation = ''
    if (deleteChar.hasAttribute(disabled)) {
        deleteChar.removeAttribute(disabled)
    }
})

deleteChar.addEventListener('click', ()=> {
    if (evaluation.textContent !== '' && !typedChars.length) {
        deleteChar.setAttribute('disabled')
    } else {
        endResult.textContent = endResult.textContent.slice(0, endResult.textContent.length - 1)
        // console.log('Event fired')
        calculation = calculation.slice(0, -1)
    }
})



