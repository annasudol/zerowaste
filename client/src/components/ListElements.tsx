// import * as React from "react";
// import { List, Avatar, Button, Skeleton } from 'antd';

// interface IngredientsListProps {
//     list: string[] | []
//     deleteItem?(index: number): VoidFunction
// }
// export const ListElements: React.FunctionComponent<IngredientsListProps> = ({ list = [], deleteItem }): React.ReactElement => (
//     <List
//         className="demo-loadmore-list"
//         itemLayout="horizontal"
//         dataSource={list}
//         renderItem={item => (
//             <List.Item
//                 actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
//             >
//                 <Skeleton avatar title={false} loading={item.loading} active>
//                     <List.Item.Meta
//                         avatar={
//                             <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                         }
//                         title={<a href="https://ant.design">{item.name.last}</a>}
//                         description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//                     />
//                     <div>content</div>
//                 </Skeleton>
//             </List.Item>
//         )}
//     />
// );
