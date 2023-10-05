export function MakeGetRequest(api_url: string){
    return (
        fetch(process.env.REACT_APP_API_BASE_URL + api_url)
        .then( response => {
            return response.json();
        })
    )
}

export function MakePutRequest(api_url: string, requestBody: FormData){
    return (
        fetch(process.env.REACT_APP_API_BASE_URL + api_url, {
            method: 'PUT',
            body: requestBody
        }).then( response => {
            return response.json();
        })
    )
}