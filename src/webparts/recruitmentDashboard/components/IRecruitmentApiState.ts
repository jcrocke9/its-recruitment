import { IListItem } from './IListItem';
export interface IRecruitmentApiState {
    status?: string;
    items?: IListItem[];
    filter?: number;
    item?: IListItem;
    vrDetailsVisible?: boolean;
}