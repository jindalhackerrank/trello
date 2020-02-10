export const appendNewItem= (lists=[],item,callback)=>{
    let list = JSON.parse(JSON.stringify(lists));
    if (list.length > 0 && typeof item === "object") 
        item.id = list[list.length - 1].id + 1;
    list.push(item)
    callback(list);
}

export const updateListItem= (list=[],index,obj,callback)=>{
    let l = JSON.parse(JSON.stringify(list));
    l[index] = obj;
    callback(l);
}

