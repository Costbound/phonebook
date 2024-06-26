import css from './SearchBox.module.css'
import { useId } from 'react'
import { changeFilter } from '../../redux/filters/slice'
import { selectNameFilter } from '../../redux/filters/selectors'
import { useSelector, useDispatch } from 'react-redux'

export default function SearchBox() {
    const dispatch = useDispatch()
    const searchValue = useSelector(selectNameFilter)

    const handleChange = (e) => dispatch(changeFilter(e.target.value))

    const id = useId()
    return (
        <div className={css.container}>
            <label className={css.label} htmlFor={id}>Find contacts by name or by number
                <input className={css.input} type="text" name="search" id={id} value={searchValue} onChange={handleChange} />
            </label>
        </div>
    )
}