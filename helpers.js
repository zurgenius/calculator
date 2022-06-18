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

export function cosec(x) {
  return 1/Math.sin(x)
}