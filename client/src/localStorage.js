const ID = "ID";

export default {
    haveId()
    {
        return localStorage.getItem(ID) != null;
    },

    getId(){
        return localStorage.getItem(ID);
    },

    setId(id)
    {
        localStorage.setItem(ID, id);
    },

    removeId()
    {
        localStorage.removeItem(ID);
    }
} 