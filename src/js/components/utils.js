// 13.42.3 => 13,13.42,13.42.3
export function getParents(cat){
    const res = []
    const arr2 = []
    const arr = cat.split('.')
  
    arr.forEach(el => {
        arr2.push(el)
        res.push(arr2.join('.'))
    });
    return res
}

export function getTopParent(cat){
    const arr = cat.split('.')
    return arr[0]
}

// 1.2.3 => 1.2.3.1,1.2.3.2,1.2.3.3
export function isFirstChild(parent,child){
     const arrChildLength = child.split('.').length
     const arrParentLength = parent.split('.').length

     let res = child.indexOf(parent);

     if(res===0&&arrParentLength===arrChildLength-1){
       return true
    }
    return false

}

export function isChild(parent,child){
   

     let res = child.indexOf(parent);

     if(res===0){
       return true
    }
    return false

}