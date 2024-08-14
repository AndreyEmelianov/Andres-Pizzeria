import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export const getSelf = async () => {
  const { data } = await axiosInstance.get<User>('/auth/self');

  return data;
};
