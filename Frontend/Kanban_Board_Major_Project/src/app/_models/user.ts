export type User = {
     email?: string;
     name?: string;
     password?: string;
     phoneNo?: number;
     currentPassword?:string;
     image?: File | null | Blob;
 };
 