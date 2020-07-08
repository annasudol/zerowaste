export const handlePhotoDelete = async (url: string) => {

    let path = 'test-app-gql.herokuapp.com'

    if(process.env.NODE_ENV === "development"){
        path = `localhost:${process.env.REACT_APP_PORT}`
    }
    const publicId = url.match(/(?=).{20}?(?=.jpe?g|.png)/);
    if (publicId) {
        try {
            const response = await fetch(`https://${path}/delete/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ public_id: publicId[0] })
            });
            return response.json();

        } catch { }
    }

}