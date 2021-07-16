import addNotice from "./addNotice";
import deleteNotice from "./deleteNotice";
import updateNotice from "./updateNotice";

const handleAdd = addNotice();
const handleUpdate = updateNotice();
const handleDelete = deleteNotice();

const noticeReducer = (state, action) => {
    switch (action.type) {
        case 'finished':
            return action.state;
        case 'add':
            handleAdd(action.state)
            console.log('kkkk',action.state);
            return [action.state, ...state];// spread operator javascript
        case 'update':
            handleUpdate(action.id, action.state)
            return state.map(item => {
                if (item?.id === action?.id) {
                    return action?.state
                } else {
                    return item
                }
            })
        case 'delete':
            console.log('delete artık');
            handleDelete(action.id, action.state)
            return state.map(item => {
                if (item?.id === action?.id) {
                    return { ...action?.state, status: false }
                } else {
                    return item
                }
            });
        default:
            return state;
    }
}
export default noticeReducer

