import React from 'react';
import { Skeleton, Switch, Card, Avatar, Layout, Row, Col } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const Dashboard = () => {
    return (
        <Layout>
            <Row>
                <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                    <Card
                        style={{ margin: 16 }}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                    <Card
                        style={{ margin: 16 }}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                    <Card
                        style={{ margin: 16 }}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 24 }}>
                    <Card
                        style={{ margin: 16 }}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={false} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
            </Row>
        </Layout>

    );
};

export default Dashboard;
//<div className="container-fluid">
//    <div className="row">
//        <div className="col-lg-3 col-6">
//            <SmallBox
//                count={150}
//                title="New Orders"
//                type="info"
//                icon="ion-android-people"
//                navigateTo="/"
//            />
//        </div>
//        <div className="col-lg-3 col-6">
//            <SmallBox
//                count={53}
//                title="Bounce Rate"
//                type="success"
//                navigateTo="/"
//            />
//        </div>
//        <div className="col-lg-3 col-6">
//            <SmallBox
//                count={44}
//                title="User Registrations"
//                type="warning"
//                navigateTo="/"
//            />
//        </div>
//        <div className="col-lg-3 col-6">
//            <SmallBox
//                count={65}
//                title="Unique Visitors"
//                type="danger"
//                navigateTo="/"
//            />
//        </div>
//    </div>

//    <div className="row">

//    </div>
//</div>