import { Router } from 'express';
const uploadRouter = Router();

uploadRouter.post('/', (req, res) => {
    // Logic for file upload
    res.send('File uploaded');
});

export default uploadRouter;
export { uploadRouter };