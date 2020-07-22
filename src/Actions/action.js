export function InitData(data) {

    return {
        type: "InitData",
        payload: data
    }

}

export function SetSelectedDate(data) {

    return {
        type: "SetSelectedDate",
        payload: data
    }

}

export function Discard() {

    return {
        type: "Discard"
    }

}


export function StoreData() {

    return {
        type: "StoreData"
    }

}

export function editNote(data) {

    return {
        type: "editNote",
        payload: data
    }

}


export function ShowNote(data) {

    return {
        type: "ShowNote",
        payload: data
    }

}


export function DeleteNote() {

    return {
        type: "DeleteNote"
    }

}

export function ViewContent(data) {

    return {
        type: "ViewContent",
        payload: data
    }

}


export function setLocalStorageData() {

    return {
        type: "setLocalStorageData"
    }

}





