import { wiseyStudy } from '../../index'

export const fetchToken = () => wiseyStudy.get('/auth/anonymous?platform=subscriptions')
