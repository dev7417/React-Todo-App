import React, { useEffect, useState } from 'react'


const getLocalItem = () => {
    let list = localStorage.getItem("lists");
    if (list) {
        return JSON.parse(list)
    }
    else {
        // return alert("you are not allowed")
        return []
    }
}
export default function Todo() {
    const [state, setState] = useState("hello");
    const [todo, setTodo] = useState(getLocalItem());
    const [isEditItem, setIsEditItem] = useState(null);

    const handleInputClick = (e) => {
        setState(e.target.value);
    }


    const handleOnclick = (e) => {
        e.preventDefault();
        if (!state) {
            alert('plz fill adata')
        } else if (state) {
            setTodo(
                todo.map((item) => {
                    if (item.id === isEditItem) {
                        return { ...item, name: state }
                    }
                    return item
                })
            )
        }
        const allInputData = { id: new Date().getTime().toString(), name: state }
        setTodo([...todo, allInputData]);
        setState("")

    }
    const removeTask = (index) => {
        const finalData = todo.filter((item) => {
            return index !== item.id;
        })
        setTodo(finalData);
    }

    const editBtn = (id) => {
        let newEditItems = todo.find((item) => {
            return item.id === id
        })
        setState(newEditItems.name);
        console.log(newEditItems)

    }
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(todo), [todo])
    })
    return (

        <div className="input">
            <header>
                <div className="data">
                    <input type="text" value={state} onChange={handleInputClick} /> <button className="btn" onClick={handleOnclick}>ADD</button>
                    <div className="para-data">
                        {todo.map((item) => {
                            return <><div className="dynpara" key={item.id}> <p >{item.name}</p>
                                <button className='dynBtn' onClick={() => removeTask(item.id)}>Remove</button><button className="dynBtn" onClick={() => editBtn(item.id)}>Edit</button> </div>
                            </>
                        })}
                    </div>
                </div>

            </header>
        </div>

    )
}
