import { IListItem } from './IListItem';
export interface IvrDetailsModalProps {
    filter?: number;
    item?: IListItem;
    vrDetailsVisible: boolean;
    _closeModal(vrDetailsVisible);
}