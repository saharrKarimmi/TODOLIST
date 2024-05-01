import './App.css';
import {useEffect, useState} from "react";
import {MdDelete} from "react-icons/md";
import {BsCheckLg} from "react-icons/bs";
import {AiOutlineEdit} from "react-icons/ai";
import {logDOM} from "@testing-library/react";


function App() {
    const [isCompletedScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setAllTodos] = useState([])
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [completedTodos, setCompletedTodos] = useState([])
    const [currentEdit, setCurrentEdit] = useState("")
    const [currentEditedItem, setCurrentEditedItem] = useState("")
    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        };
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setAllTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    }
    const handleDeleteTodo = (index) => {
        let reduscedTodo = [...allTodos]
        reduscedTodo.splice(index)
        localStorage.setItem('todolist', JSON.stringify(reduscedTodo))
        setAllTodos(reduscedTodo
        )
    }
    const handleCompeleted = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '/' + mm + '/' + yyyy + "at" + h + ':' + m + ':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn
        }
        let updatedComletedArr = [
            ...completedTodos
        ]
        updatedComletedArr.push(filteredItem)
        setCompletedTodos(updatedComletedArr)
        handleDeleteTodo(index)
        localStorage.setItem('completedTodos', JSON.stringify(updatedComletedArr))
    }
    const handleDeleteComlpetedTodos = (index) => {
        let reduscedTodo = [...completedTodos]
        reduscedTodo.splice(index)
        localStorage.setItem('completedTodos', JSON.stringify(reduscedTodo))
        setCompletedTodos(reduscedTodo
        )
    }
    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'))
        let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
            setAllTodos(savedTodo);
        }
        if (savedCompletedTodos) {
            setCompletedTodos(savedCompletedTodos)
        }
    }, []);
    const handleEdit = (index, item) => {
        setCurrentEdit(index)
        setCurrentEditedItem(item)
    }
    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => {
            return {
                ...prev, title: value
            }
        })
    }
    const handleUpdateDescription = (value) => {
        setCurrentEditedItem((prev) => {
            return {
                ...prev, description: value
            }
        })
    }
    const handleUpdateTodo = () => {
        let newToDo = [...allTodos];
        newToDo[currentEdit] = currentEditedItem;
        setAllTodos(newToDo);
        setCurrentEdit("");
    }
    return (
        <div className="bg-gray-900 h-screen overflow-hidden text-white text-center pt-10">
            <h1 className="text-3xl font-bold">
                کار هایی که باید انجام دهم
            </h1>
            <div
                className={"items-center bg-gray-700 p-[2%] w-fit  ml-auto mr-auto mt-[4%] max-h-[4000px] overflow-y-auto shadow-2xl"}>
                <div className={"flex items-center justify-center border-b pb-[25px] mb-[25px]"}>
                    <div
                        className={"  mr-[25px] text-white bg-emerald-700  mt-[25px] p-[10px] w-[100px] hover:bg-emerald-800"}>
                        <button type={"button"} onClick={handleAddTodo}>اضافه کردن</button>
                    </div>
                    <div className={"flex flex-col items-end mr-[25px] "}>
                        <label className={"font-bold mb-[10px]  text-lg "}>: توضیحات</label>
                        <input type={"text"} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                               placeholder={"توضیحات کار چیست ؟"}
                               className={"text-sm p-[8px] text-right text-black items-end border-none outline-none w-[250px] hover:outline-emerald-700"}/>
                    </div>
                    <div className={"flex flex-col items-end mr-[25px] "}>
                        <label className={"font-bold mb-[10px] text-lg"}>: موضوع</label>
                        <input type={"text"} value={newDescription} onChange={(e) => setNewDescription(e.target.value)}
                               placeholder={"موضوع کار چیست ؟ "}
                               className={"text-sm p-[8px] text-right text-black border-none outline-none w-[250px] hover:outline-emerald-700"}/>
                    </div>

                </div>
                <div className={" flex  justify-end "}>
                    <button type={"button"}
                            className={`  mr-[2px] text-white bg-gray-600 mt-[25px] p-[10px] w-fit active:bg-emerald-700  ${isCompletedScreen === true && 'active'}`}
                            onClick={() => setIsCompleteScreen(true)}> بررسی
                    </button>
                    <button type={"button"}
                            className={`  mr-[2px] text-white bg-gray-600 mt-[25px] p-[10px] w-fit active:bg-emerald-700  ${isCompletedScreen === false && 'active'}`}
                            onClick={() => setIsCompleteScreen(false)}> برنامه ها
                    </button>


                </div>

                {isCompletedScreen === false && allTodos.map((item, index) => {
                    // console.log("is =",item)
                    if (currentEdit === index) {
                        console.log("isaa =", currentEdit)
                        return (
                            <>
                                <div key={index} className={"bg-gray-600 p-[10px] flex flex-col mt-2  "}>
                                    <input placeholder={"Updated Title"} value={currentEditedItem.title}
                                           className={"border-s-gray-400 p-[5px] text-right text-black m-[5px] rounded "}
                                           onChange={(e) => handleUpdateTitle(e.target.value)}/>
                                    <textarea placeholder={"Updated Title"} value={currentEditedItem.description}
                                              rows={4}
                                              className={"border-s-gray-400 p-[5px] text-right text-black m-[5px] rounded "}
                                              onChange={(e) => handleUpdateDescription(e.target.value)}/>
                                </div>
                                <div>
                                    <button
                                        className={"text-center   text-white bg-emerald-700  mt-[20px] p-[10px] w-[150px] hover:bg-emerald-800 "}
                                        type={"button"} onClick={handleUpdateTodo}>بروز رسانی
                                    </button>
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <div key={index}
                                 className={"flex bg-gray-800 shadow-2xl items-center pt-[20px] justify-between mt-4 p-[25px] mb-[10px]"}>
                                <div className={"flex  "}>
                                    <MdDelete className={"text-3xl cursor-pointer hover:text-red-500 "}
                                              onClick={() => handleDeleteTodo(index)}/>
                                    <BsCheckLg className={" text-3xl ml-[10px] text-emerald-700 hover:text-emerald-800"}
                                               onClick={() => handleCompeleted(index)}/>
                                </div>
                                <div
                                    className={"flex flex-col"}>
                                    <h3 className={"text-xl justify-end flex text-right text-emerald-700 font-bold m-0"}>{item.title}</h3>
                                    <p className={"text-xl justify-end flex text-right text-gray-400 mt-0"}>{item.description}</p>
                                </div>

                            </div>
                        )
                    }

                })}
                {isCompletedScreen === true && completedTodos.map((item, index) => {
                    console.log("isddd =", completedTodos)
                    return (
                        <div key={index}
                             className={"flex bg-gray-800 shadow-2xl items-center pt-[20px] justify-between mt-4 p-[25px] mb-[10px]"}>
                            <div className={"flex  "}>
                                <MdDelete className={"text-3xl cursor-pointer  hover:text-red-500 "}
                                          onClick={() => handleDeleteComlpetedTodos(index)}/>
                                <BsCheckLg className={" text-3xl ml-[10px] text-emerald-700 text-left hover:text-emerald-800"}
                                           onClick={() => handleCompeleted(index)}/>
                                <AiOutlineEdit className={" text-3xl ml-[10px] text-emerald-700 text-left hover:text-emerald-800"}
                                               onClick={() => handleEdit(index, item)}/>
                            </div>
                            <div
                                className={"flex flex-col"}>
                                <h3 className={"text-xl justify-end flex text-right text-emerald-700 font-bold m-0"}>{item.title}</h3>
                                <p className={"text-xl justify-end flex  text-gray-400 text-right mt-0"}>{item.description}</p>
                                <p className={"text-xl justify-end flex  text-gray-400 text-right mt-0"}><small>
                                    {item.completedOn}: تارخ </small></p>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    );
}

// https://www.youtube.com/watch?v=Evjl2nIfk6c&list=PLg8h8Ej1e8l3YF-GTW1gxmDISO-qt_RSk
export default App;
