export const propertyReducer = (state, action) => {
    // switch statement used to perform action
    switch (action.type) {
        case 'SELECT_PROPERTY':
            return action.property     
            
        case 'CLEAR_PROPERTY':
            return null
    
        default:
            return null
            
    }
}