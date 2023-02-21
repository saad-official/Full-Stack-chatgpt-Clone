interface Message {
    text: string;
    createdAt: admin.firestore.TimeStamp;
    user: {
        _id: string,
        name: string,
        avator:string
    }
}
// interface KonvaMouseEvent extends React.MouseEvent<HTMLElement> {
//     target: KonvaTextEventTarget
//   }

