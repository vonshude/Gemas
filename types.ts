
export enum Role {
    User = 'user',
    Model = 'model',
}

export interface Message {
    id: number;
    role: Role;
    content: string;
}
