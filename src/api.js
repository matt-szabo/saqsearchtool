import superagent from 'superagent'
import { API_HOST } from './config'

class Api {


    getBottleList = (q,sortCriteria,firstResult) =>(

        superagent
            .post(`${API_HOST}`)
            .set('Content-Type', 'application/json')
            .send({q,firstResult,numberOfResults:20,sortCriteria,groupBy:[{"field":"@tpprixbande","maximumNumberOfValues":"1000","sortCriteria":"occurences","injectionDepth":"1000"},{"field":"@tppays","maximumNumberOfValues":"1000","sortCriteria":"AlphaAscending","injectionDepth":"1000"}]})
    )
}

export default new Api();
