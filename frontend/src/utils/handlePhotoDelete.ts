export const handlePhotoDelete = async (url: string) => {
    const publicId = url.match(/(?=).{20}?(?=.jpe?g|.png)/);
    if (publicId) {
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/delete/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ public_id: publicId[0] })
            });
            console.log(response, "response")
            return response.json();

        } catch { }
    }

}