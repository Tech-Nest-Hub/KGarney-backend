

export const verifyToken = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
    } catch (error) {
        
    }
}