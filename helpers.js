export function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

export function setCursorPosition(parent, position) {
    let child = parent.firstChild
    while(position > 0) {
      let length = child.textContent.length
      if(position > length) {
        position -= length
        child = child.nextSibling
      }
      else {
        if(child.nodeType == 3) return document.getSelection().collapse(child, position)
        child = child.firstChild
      }
    }
  }

export function insert(ind, s) {
    if (ind >= 0) {
        return this.substring(0, ind) + s + this.substring(ind)
    }
    return undefined
}

export function ctg(x){
  return Math.cos(x)/Math.sin(x)
}

export function sec(x){
  return 1/Math.cos(x)
}

export function csec(x) {
  return 1/Math.sin(x)
}

export const cosEval = "if('s'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'co'==endResult.textContent.slice(a-2,a)&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const sinEval = "if('n'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'si'==endResult.textContent.slice(a-2,a)&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const tanEval = "if('n'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'ta'==endResult.textContent.slice(a-2,a)&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const ctgEval = "if('g'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'ct'==endResult.textContent.slice(a-2,a)&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const secEval = "if('c'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'se'==endResult.textContent.slice(a-2,a)&&'c'!==endResult.textContent[a-3]&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const csecEval = "if('c'==e.key){let a=getCaretPosition(endResult);btn.addEventListener('click',()=>{setCursorPosition(endResult,a+2)}),'cse'==endResult.textContent.slice(a-3,a)&&(endResult.textContent=endResult.textContent.insert(a,'()'),setCursorPosition(endResult,a),setTimeout(()=>{btn.click()},0)),btn.removeEventListener('click',()=>{setCursorPosition(endResult,a+2)})}"

export const allowedSymbols = ['c', 'o', 's', 'i', 'n', 't', 'a', 'g', 'e', 'l', '!', '+', '-', '*', '/', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', '.']
export const signs = ['!', '+', '-', '*', '/']

var g = 7;
var p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
];

var g_ln = 607/128;
var p_ln = [
    0.99999999999999709182,
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.21743961811521264320e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.26190838401581408670e-4,
    0.36899182659531622704e-5
];

// Spouge approximation (suitable for large arguments)
function lngamma(z) {

    if(z < 0) return Number('0/0');
    var x = p_ln[0];
    for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
    var t = z + g_ln + 0.5;
    return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z);
}
export function gamma (z) {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    else if(z > 100) return Math.exp(lngamma(z));
    else {
        z -= 1;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (z + i);
        }
        var t = z + g + 0.5;

        return Math.sqrt(2 * Math.PI)
            * Math.pow(t, z + 0.5)
            * Math.exp(-t)
            * x
        ;
    }
};

export function intFactorial (n) {
  if (n === 0){
    return 1
  }
  return n * intFactorial(n-1)
}

export function floatFactorial (n) {
  return gamma(n+1)
}

export const advancedBtns = ['sin', 'cos', 'tan', 'ctg', 'sec', 'csec', 'ln', 'log']

export function lg (a, b){
  return Math.log(b)/Math.log(a)
}