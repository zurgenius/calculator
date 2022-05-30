const endResult = document.getElementById('end-result')
const simpleButtons = document.querySelectorAll('#simple-num')
const cleanAll = document.getElementById('clean-all')
const deleteChar = document.getElementById('delete-char')
const evaluation = document.getElementById('evaluation')
let calculation = ''
simpleButtons.forEach(btn => {
    btn.addEventListener('click', ()=> {
        if (btn.textContent !== '=') {
            endResult.textContent = endResult.textContent.concat(btn.textContent)
            calculation = calculation.concat(btn.textContent)
        } else {
            try {
                // console.log(evaluation)
                evaluation.textContent = endResult.textContent
                if (eval(calculation) === Infinity || eval(calculation) === -Infinity) {
                    endResult.textContent = 'Division by 0 is not allowed'
                } else {
                    if (calculation.includes('0/0')) {
                        endResult.textContent = 'Division by 0 is not allowed'
                    } else {
                        endResult.textContent = eval(calculation)
                    }
                }
            } catch (e) {
                 endResult.textContent= 'Incorrect math example'
            }
            }
        }
    )
})

cleanAll.addEventListener('click', () => {
    evaluation.textContent = ''
    endResult.textContent = ''
    calculation = ''
    if (deleteChar.hasAttribute(disabled)) {
        deleteChar.removeAttribute(disabled)
    }
})

if (endResult.textContent === '')

deleteChar.addEventListener('click', ()=> {
    if (evaluation.textContent !== '') {
        deleteChar.setAttribute(disabled)
    } else {
        endResult.textContent = endResult.textContent.slice(0, endResult.textContent.length - 1)
        // console.log('Event fired')
        calculation = calculation.slice(0, -1)
    }
    
})



