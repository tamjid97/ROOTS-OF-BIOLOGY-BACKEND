
export interface IBanner {
  title: string;              
  description?: string;     
  picture: string;             
  isActive: boolean;                  
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdated {
  title?: string;              
  description?: string;     
  picture?: string;             
  isActive?: boolean;                  
  createdAt?: Date;
  updatedAt?: Date;
}