import {IhaDto} from "./IhaDto";

export interface IhaRentalDto extends IhaDto{
  id: string,
  user: string,
  iha: string,
  start_date: Date,
  end_date: Date
}
