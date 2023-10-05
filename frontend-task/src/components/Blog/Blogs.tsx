import React from 'react'
import { Link } from 'react-router-dom';
import { List } from 'antd'

import { MakeGetRequest } from '../../apiCall';


const testData = [
    {
        body: "ab nemo optio odio",        
        id: 61,
        title: "voluptatem",
        userId: 7 
    },
    {
        body: "delectus tenetur corporis similique nobis",        
        id: 62,
        title: "doloribus",
        userId: 7 
    },
    {
        body: "nobis repellendus rerum omnis facilis",        
        id: 63,
        title: "consectetur",
        userId: 7 
    },
    {
        body: "vero blanditiis debitis in nesciunt",        
        id: 64,
        title: "est",
        userId: 7 
    },
    {
        body: "debitis in nesciunt doloribus dicta",        
        id: 65,
        title: "ut",
        userId: 7 
    },
    {
        body: "magnam minus velit",        
        id: 66,
        title: "ducimus",
        userId: 7 
    }
];


export default function Blogs() {
    const [userPosts, setUserPosts] = React.useState(testData);
    React.useEffect(()=>{
      MakeGetRequest("/users/7/posts").then(data => { setUserPosts(data); });
    }, []);

    return (
        <div>
            <List
                itemLayout="horizontal"
                size="small"
                dataSource={userPosts}
                pagination={{
                    align: "center",
                    pageSize: 4,
                }}
                renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Link to={"/blogs/"+ item.id}>Read More</Link>
                    ]}
                >
                    <List.Item.Meta
                        title={<Link to={"/blogs/"+ item.id}>{item.title}</Link>}
                    />
                    {item.body}
                </List.Item>
                )}
            />
        </div>
    )
}
