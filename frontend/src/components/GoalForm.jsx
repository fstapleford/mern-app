import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createGoal, reset } from "../features/goals/goalSlice"
import Spinner from "../components/Spinner"



function GoalForm() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }

  return (
  <section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor='text'>Goal</label>
            <input 
                type='text' 
                name='text'
                id='text'
                value={text}
                placeholder='Add goal text'
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className="form-group">
            <button className="btn btn-block" type='submit'>
                Add Goal
            </button>
        </div>
    </form>
  </section>
  )
}
export default GoalForm
