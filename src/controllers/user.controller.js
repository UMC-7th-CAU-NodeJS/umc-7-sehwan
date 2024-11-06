import  {StatusCodes} from "http-status-codes";
import  {bodyToUser} from "../dtos/user.dto.js";
import  {userSignUp} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    console.log("SignUp Api called!");
    console.log("body:", req.body);

    const user = await userSignUp(bodyToUser(req.body)); //dtoo를 사용해서 service로 넘김
    res.status(StatusCodes.OK).json({result: user});
};