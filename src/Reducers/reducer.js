const initialState = {
    savedData: [], showNote: false, noteKey: null,
    selectedDate: null, dataUsed: 0,
    editNote: false,noteName:"Add New Note",
    deleteNote:false,showContent:false,contentData:null
}

function Reducer(state = initialState, action) {


    switch (action.type) {

        case "InitData":
            let initData = [];
            if (localStorage.getItem("noteTakingData")) {
                initData = JSON.parse(localStorage.getItem("noteTakingData"));
            }
            else {
                localStorage.setItem("noteTakingData", JSON.stringify(initData));
            }
            return {
                ...state,
                savedData: initData,
                selectedDate: action.payload

            }

        case "SetSelectedDate":

            return {
                ...state,
                selectedDate: action.payload,
                showNote: true,
                noteKey: null,
                editNote: false,
                noteName:"Add New Note",
                deleteNote:false

            }

        case "Discard":

            return {
                ...state,
                showNote: false,
                noteKey: null,
                editNote: false,
                deleteNote:false,
                showContent:false,
                contentData:null

            }

        case "StoreData":

        let data= JSON.parse(localStorage.getItem("noteTakingData"));


            return {
                ...state,
                savedData:data,
                showNote: false,
                noteKey: null,
                editNote: false,
                deleteNote:false

            }


        case "editNote":

            return {
                ...state,
                noteKey: action.payload,
                noteName:"Edit Note",
                showNote:true,
                editNote: true,
                deleteNote:false
            }


        case "DeleteNote":

            return {
                ...state,
                deleteNote:true
            }


        case "ViewContent":

            return {
                ...state,
                showContent:true,
                contentData:action.payload
            }


        case "setLocalStorageData":
            let total = 0,
                keyLength, key;
            for (key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {

                    continue;
                }

                keyLength = ((localStorage[key].length + key.length) * 2);
                total += keyLength;

            };
            return {
                ...state,
                dataUsed: (total / 1024).toFixed(2)
            }



        default: return state;
    }
}
export default Reducer;