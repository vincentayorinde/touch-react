import { combineReducers } from 'redux'
import errors from './errors'
import success from './success'
import auth from './auth'
import electoralAreas from './electoral'
import modules from './module'
import positions from './position'
import dues from './dues'
import people from './people'

export default combineReducers({
    errors,
    success,
    auth,
    electoralAreas,
    modules,
    positions,
    dues,
    people
})
