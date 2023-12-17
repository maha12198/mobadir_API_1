// note: this is case sensitive with the response coming as json format from tha API
//  TypeScript interfaces define a contract for the expected structure of the data, including the property names and their types.
export interface ITopic {
    id? : number;
    title?: string;
    isVisible?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
    videoUrl?: string;
    term?: string; // in getting

    subjectId?: number;
    username?: string;
    contentId?: number;
}