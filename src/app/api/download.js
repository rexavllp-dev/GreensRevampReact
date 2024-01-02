import axios from 'axios';

export default async (req, res) => {
    console.log(req.query.url)
    try {
        // const response = await axios.get(req.query.url);

        const response = await fetch(req.query.url);
        // console.log(response)
        // res.setHeader('Content-Type', response.headers['content-type']);
        // res.setHeader('Content-Disposition', 'attachment');
        res.send(response.data);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).end('Internal Server Error');
    }
};