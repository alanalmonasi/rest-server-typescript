import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
   const users = await User.findAll({
      where: {
         active: 1,
      },
   });
   res.json({
      msg: 'Get users',
      users,
   });
};

export const getUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   const user = await User.findByPk(id);

   if (!user) {
      return res.status(400).json({
         msg: `User with id ${id} does not exists`,
      });
   }

   res.json({
      msg: 'Get user',
      user,
   });
};

export const postUser = async (req: Request, res: Response) => {
   const { body } = req;

   try {
      const emailExist = await User.findOne({
         where: {
            email: body.email,
         },
      });

      if (emailExist) {
         return res.status(400).json({
            msg: `User with email ${body.email} already exists`,
         });
      }

      const user = new User(body);
      await user.save();
      res.json({ msg: 'User created', user });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server error',
      });
   }
};

export const putUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { body } = req;

   try {
      const user = await User.findByPk(id);
      if (!user) {
         return res.status(404).json({
            msg: `No user with id ${id}`,
         });
      }

      await user.update(body);

      res.json({ msg: 'User updated', user });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Server error',
      });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   const user = await User.findByPk(id);
   if (!user) {
      return res.status(404).json({
         msg: `No user with id ${id}`,
      });
   }

   // await user.destroy()
   await user.update({ active: 0 });

   res.json({
      msg: 'User deleted',
      user,
   });
};
