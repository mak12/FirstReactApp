import { Platform } from 'react-native'

export const items = (method, body) => {
    const ipAddr = Platform.OS === 'android' ? '192.168.1.79' : 'localhost'
    
     const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        
      return  fetch("http://"+ipAddr+":3000/items.json", {
             method: method,
             headers,
             body: JSON.stringify( body )
         })
            .then( response => response.json())
            
             .catch((error)=>{
     console.log("Api call error");
            alert(error.message);
     
  });
    }