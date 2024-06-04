// import { Request, Response, NextFunction } from "express";

// export async function checkRole(allowedRoles: Array<string>){return function(req: Request,
//     res: Response,
//     next: NextFunction){
//         try {

//             const userRole = req.existingUser.role;

//             if (userRole && allowedRoles.includes(userRole)) {
//               next();
//             } else {
//               res.status(403).json({ error: 'Access denied. Role authorization required.' });
//             }
//         } catch (error) {
//             console.log(error);
//              return res.sendStatus(400);
//         }
//     }}
