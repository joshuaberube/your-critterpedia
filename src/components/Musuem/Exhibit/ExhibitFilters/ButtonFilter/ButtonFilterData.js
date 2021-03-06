import { useSelector } from "react-redux"
import { selectLanguage } from "../../../../../redux/slices/userSlice"
import { selectFilters } from "../../../../../redux/slices/filtersSlice"

export const getMonths = lang => {
    const formatAPILang = `${lang.slice(2, 4)}-${lang.slice(0, 2)}`
    const monthsArr = []

    for (let month = 0; month < 12; month++) {
        monthsArr.push(new Date(2020, month).toLocaleDateString(formatAPILang, {month: "short"}))
    }
    return monthsArr
}

const ButtonFilterData = () => {
    const filters = useSelector(selectFilters)
    const lang = useSelector(selectLanguage)

    const {
        selectedMonths, 
        isAllYearChecked, 
        selectedCritterRarity, 
        isAllCritterRarityChecked, 
        isAllLocationsChecked, 
        selectedLocations, 
        selectedSpeeds, 
        isAllSpeedsChecked,
        selectedFishShadowSizes,
        isAllFishShadowSizesChecked,
        selectedSeaCreatureShadowSizes,
        isAllSeaCreatureShadowSizesChecked
    } = filters


    const data = {
        months: {
            mappedOverArr: getMonths(lang), 
            selectedArr: selectedMonths,
            filter: "selectedMonths",
            isChecked: isAllYearChecked,
            isCheckedName: "isAllYearChecked",
            label: "Months"
        },
        rarityLevels: {
            mappedOverArr: ["Common", "Uncommon", "Rare", "Ultra-rare"], 
            selectedArr: selectedCritterRarity,
            filter: "selectedCritterRarity",
            isChecked: isAllCritterRarityChecked,
            isCheckedName: "isAllCritterRarityChecked",
            label: "Rarity Levels"
        },
        fishLocations: {
            mappedOverArr: ["River", "River (Clifftop)", "River (Mouth)", "Pond", "Sea", "Pier"], 
            selectedArr: selectedLocations,
            filter: "selectedLocations",
            isChecked: isAllLocationsChecked,
            isCheckedName: "isAllLocationsChecked",
            label: "Locations"
        },
        fishShadowSizes: {
            mappedOverArr: ["Smallest (1)", "Small (2)", "Medium (3)", "Medium (4)", "Medium with fin (4)", "Large (5)", "Largest (6)", "Largest with fin (6)", "Narrow"], 
            selectedArr: selectedFishShadowSizes,
            filter: "selectedFishShadowSizes",
            isChecked: isAllFishShadowSizesChecked,
            isCheckedName: "isAllFishShadowSizesChecked",
            label: "Shadow Sizes"
        },
        seaCreatureShadowSizes: {
            mappedOverArr: ["Smallest", "Small", "Medium", "Large", "Largest"], 
            selectedArr: selectedSeaCreatureShadowSizes,
            filter: "selectedSeaCreatureShadowSizes",
            isChecked: isAllSeaCreatureShadowSizesChecked,
            isCheckedName: "isAllSeaCreatureShadowSizesChecked",
            label: "Shadow Sizes"
        },
        seaCreatureSpeeds: {
            mappedOverArr: ["Stationary", "Very slow", "Slow", "Medium", "Fast", "Very fast"], 
            selectedArr: selectedSpeeds,
            filter: "selectedSpeeds",
            isChecked: isAllSpeedsChecked,
            isCheckedName: "isAllSpeedsChecked",
            label: "Sea Creature Speeds"
        },
    }

    return data
}

export default ButtonFilterData
