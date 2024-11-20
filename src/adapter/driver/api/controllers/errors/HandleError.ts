import { Request, Response } from 'express';

export class HandleError {
    handleError(res: Response, error: any) {
        if (error.name.includes('ValidationError')) {
          res.status(400).json({ message: error.message });
        } else if (error.name.includes('NotFoundError')) {
          res.status(404).json({ message: error.message });
        } else if(error.name.includes('DatabaseError')){
          res.status(500).json({ message: error.message });
        }else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}