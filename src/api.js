/**********************************
 MODULE INITIALISATION FOR API CALL
 ***********************************/
import axios from 'axios';

// BASE API URL
export default axios.create({
    baseURL: `http://localhost:5022/api/`
});