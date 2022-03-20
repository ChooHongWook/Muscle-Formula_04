import { Request, Response } from "express";
import { getRepository } from "typeorm";
import dotenv from "dotenv";
import { Users } from "../../models/entity/User";
dotenv.config();

module.exports = async (req: Request, res: Response) => {
  const { email, password, nickname, image } = req.body;
  console.log("signup Info : ", email, password, nickname, image)

  const user = await getRepository(Users).findOne({
    where: { email },
  });
  if (user) {
    (user.email = req.body.email),
    (user.password = req.body.password),
    (user.nickname = req.body.nickname);
    user.image = req.body.image;

    try {
      await user.save();
      const allUsers = await getRepository(Users).find();
      console.log("allUsers:", allUsers)
      res.status(200).json({ message: `수정 성공` });
    } catch (e) {
      console.log("회원정보 수정 실패");
    }
  } else {
    res.status(404).json({ message: `이미 존재하는 이메일 입니다` });
  }
};
