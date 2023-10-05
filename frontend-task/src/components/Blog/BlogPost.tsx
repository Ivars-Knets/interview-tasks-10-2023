import React from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
import { useParams } from 'react-router-dom';

import { MakeGetRequest, MakePutRequest } from '../../apiCall';
import { useUserContext } from '../UserProvider';


const examplePost = {
    body: "Testing Testing Testing Testing Testing Testing Testing Testing Testing",        
    id: 54321,
    title: "Test Post",
    userId: 1 
};

type UserInfo = {
    id?: number
    name?: string
}
type PostInfo = {
    title: string;
    body: string;
    id: number,
    userId: number
};


export default function BlogPost() {
    const { post_id } = useParams();
    const blogPostID = post_id ? parseInt(post_id) : null;
    const userInfo: UserInfo = useUserContext();
    const [pageState, setPageState] = React.useState("view");
    const [currentPost, setCurrentPost] = React.useState<PostInfo>(examplePost);

    React.useEffect( ()=>{
        MakeGetRequest("/users/7/posts").then(data => {
            const currentPost = data.find( (findPost:PostInfo) => findPost.id === blogPostID ); 
            setCurrentPost(currentPost); 
        });      
    }, [blogPostID]);    

    return (
        <div>
            {
                pageState === "view" && (
                    <>     
                        {
                            currentPost?.userId === userInfo.id && (            
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Button 
                                            type="primary"
                                            block
                                            onClick={()=>{
                                                setPageState("edit");
                                            }}
                                        >Edit</Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button 
                                            type="primary"
                                            danger
                                            block
                                            onClick={()=>{
                                                
                                            }}
                                        >Delete Post</Button>
                                    </Col>
                                </Row>
                            )
                        }       

                        <Row>
                            <Col span={24}>
                                <h1>{currentPost?.title}</h1>
                            </Col>
                            <Col span={24}>
                                <pre>{currentPost?.body}</pre>
                            </Col>
                        </Row>
                    </>
                )
            }
            {
                currentPost.userId === userInfo.id && pageState === "edit" && (
                    <Form
                        name="basic"
                        initialValues={ currentPost }
                        onFinish={(e) => submitPostChanges(e, setPageState) }
                        autoComplete="off"
                    >                 
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button 
                                    type="primary"
                                    block
                                    htmlType="submit"
                                >Submit Changes</Button>
                            </Col>
                            <Col span={6}>
                                <Button 
                                    block
                                    onClick={()=>{
                                        setPageState("view");
                                    }}
                                >Cancel Editing</Button>
                            </Col>
                            <Col span={6}>
                                <Button 
                                    type="primary"
                                    danger
                                    block
                                    onClick={()=>{
                                        
                                    }}
                                >Delete Post</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>    
                            <Col span={24}>             
                                <Form.Item<PostInfo>
                                    label="Post Title"
                                    name="title"
                                    rules={[{ required: true, message: 'Please input a title for the post!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>           

                            <Col span={24}>
                                <Form.Item<PostInfo>
                                    label="Blog Post"
                                    name="body"
                                    rules={[{ required: true, message: 'Please add post text!' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </Col> 
                            
                            <Col> 
                                <Form.Item<PostInfo> hidden name="id" ><Input /></Form.Item>
                                <Form.Item<PostInfo> hidden name="userId" ><Input /></Form.Item>
                            </Col>           
                        </Row>
                    </Form>
                )
            }
        </div>
    )
}


function submitPostChanges( submitData: object, setPageState:Function ){
    
    const formData = new FormData();
    Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    MakePutRequest("/posts", formData ).then(res => { 
        console.log("PUT res", res); 
        setPageState("view");
    });
}