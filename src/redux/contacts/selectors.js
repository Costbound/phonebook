import { selectNameFilter } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.items

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter], (contacts, filter) => {
    return contacts.filter(({ name, number }) => {
        // For filter by number clean symbols. Letters remain to have ability filter by name
        const regExp = /[^a-zA-Z0-9а-яА-Я]/g
        return (
            name.toLowerCase().includes(filter.toLowerCase())) ||
            number.replace(regExp, "").includes(filter.replace(regExp, "")
        )
    })
})

export const selectLoader = state => state.contacts.loading

export const selectError = state => state.contacts.error