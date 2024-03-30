export const addItem = (val) => ({
    type:"AddData",
    payload: val
})

export const DeleteItem = (val) => ({
    type:"DeleteData",
    payload: val
});

export const updateItem = (val) => ({
    type:"UpdateData",
    payload: val
});