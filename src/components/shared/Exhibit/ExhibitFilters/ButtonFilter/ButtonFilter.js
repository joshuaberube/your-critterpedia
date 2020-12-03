const newButtonFilter = ({filterInfo: {mappedOverArr, selectedArr, isChecked, label, selectedArrName, isCheckedName}, changeMuseumReducer}) => {
    const isMonthsSelected = selectedArrName === "selectedMonths"

    const editReducerArr = input => {
        const foundIndex = selectedArr.indexOf(input)
        // the bitwise (~) operator works by returning a truthy value with everything except -1
        if (~foundIndex) {
            selectedArr.splice(foundIndex, 1)
            changeMuseumReducer(selectedArrName, [...selectedArr])
        } else {
            changeMuseumReducer(selectedArrName, [...selectedArr, input])
        }
    }

    return (
        <div>
            <ul>
            {mappedOverArr.map((item, inputIndex) => (
                <li key={item}>
                    <input type="button" value={item} onClick={() => editReducerArr(isMonthsSelected ? inputIndex : item)} disabled={isChecked} />
                </li>
            ))}
            </ul>
            <label>All {label}</label>
            <input type="checkbox" checked={isChecked} onChange={e => changeMuseumReducer(isCheckedName, !isChecked)}/>
        </div>
    )
}

export default newButtonFilter