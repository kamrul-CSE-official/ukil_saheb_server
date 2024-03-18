export interface ILawyer {
  name: string;
  email: string;
  gender: string;
  img?: string;
  password: string;
  city: string;
  education: string;
  occupation: string;
  experience: number;
  about: string;
  reviews: [];
  ratings: number;
  role: string;
  clients: [];
}
