export interface IUser {
  username: string;
  email: string;
  dob: Date;
  joiningDate: Date;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  profilePic?: Buffer;
  name?: {
    firstName: string;
    lastName: string;
  };
  contact?: {
    phone: string;
    address: string;
  };
  preferences?: {
    favoriteDish: string;
    dietaryRestrictions: string[];
  };
  orderHistory?: {
    orderId: string;
    date: Date;
    totalAmount: number;
  }[];
  paymentInfo?: {
    cardNumber: string;
    expirationDate: Date;
    cvv: string;
  };
  socialProfiles?: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  subscription?: {
    plan: string;
    startDate: Date;
    endDate: Date;
  };
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}
