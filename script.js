import { getCaretPosition, setCursorPosition, insert, ctg, sec, cosec } from "./helpers.js"

const endResult = document.getElementById('end-result')
const simpleButtons = document.querySelectorAll('#simple-num')
const cleanAll = document.getElementById('clean-all')
const deleteChar = document.getElementById('delete-char')
const evaluation = document.getElementById('evaluation')
const btn = document.getElementById('btn')
let calculation = ''

String.prototype.insert = insert
Math.ctg = ctg
Math.sec = sec
Math.cosec = cosec

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

endResult.addEventListener('keypress', (e) => {
    // todo добавить разрешенные символы
    // todo сделать дизайн сложных кнопок
    if (e.key=='s') {
        let c = getCaretPosition(endResult)
        
        btn.addEventListener('click', () => {
            setCursorPosition(endResult, c+2)
        })
        if (endResult.textContent.slice(c-2, c) == 'co') {
            endResult.textContent = endResult.textContent.insert(c,'()')
            setCursorPosition(endResult, c)
            setTimeout(() => {
                btn.click()
            }, 0)
    }
    }
})

const calcParser = (input = endResult.textContent) => {
    // todo заменть все вхождения строки на подстроку искользую replaceAll
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
    if (evaluation.textContent !== '') {
        deleteChar.setAttribute(disabled)
    } else {
        endResult.textContent = endResult.textContent.slice(0, endResult.textContent.length - 1)
        // console.log('Event fired')
        calculation = calculation.slice(0, -1)
    }
    
})



