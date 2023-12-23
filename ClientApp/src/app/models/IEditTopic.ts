import { IFile } from "./IFile";
import { IQuestionModel } from "./IQuestionModel";

interface IContent 
{
    id?: number;
    content?: string;
    topicId?: number;
}

export interface IEditTopic {
    id? : number;
    title?: string;
    isVisible?: boolean;
    //updatedAt?: Date;
    createdAt?: Date;
    videoUrl?: string;
    term?: number; // in assigning 

    subjectId?: number;
    username?: string;

    content?: IContent;

    Files: IFile[];
    Questions: IQuestionModel[];

}