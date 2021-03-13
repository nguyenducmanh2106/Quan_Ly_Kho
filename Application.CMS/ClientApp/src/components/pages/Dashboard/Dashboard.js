import React from 'react';
import { SmallBox } from '../../elements/index';
import Layout from '../Mains';
const Dashboard = () => {
    return (
       
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={150}
                            title="New Orders"
                            type="info"
                            icon="ion-android-people"
                            navigateTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={53}
                            title="Bounce Rate"
                            type="success"
                            navigateTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={44}
                            title="User Registrations"
                            type="warning"
                            navigateTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={65}
                            title="Unique Visitors"
                            type="danger"
                            navigateTo="/"
                        />
                    </div>
                </div>

                <div className="row">

                    <section className="col-lg-7 connectedSortable">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-chart-pie mr-1"></i>
  Sales
</h3>
                                <div className="card-tools">
                                    <ul className="nav nav-pills ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="tab-content p-0">

                                    <div className="chart tab-pane active" id="revenue-chart"
                                        style={{ position: 'relative', height: 300 + 'px' }}>
                                        <canvas id="revenue-chart-canvas" height={300} style={{ height: 300 + 'px' }}></canvas>
                                    </div>
                                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 + 'px' }}>
                                        <canvas id="sales-chart-canvas" height={300} style={{ height: 300 + 'px' }}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="col-lg-5 connectedSortable">


                        <div className="card bg-gradient-primary">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                    <i className="fas fa-map-marker-alt mr-1"></i>
  Visitors
</h3>

                                <div className="card-tools">
                                    <button type="button"
                                        className="btn btn-primary btn-sm daterange"
                                        data-toggle="tooltip"
                                        title="Date range">
                                        <i className="far fa-calendar-alt"></i>
                                    </button>
                                    <button type="button"
                                        className="btn btn-primary btn-sm"
                                        data-card-widget="collapse"
                                        data-toggle="tooltip"
                                        title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>

                            </div>
                            <div className="card-body">
                                <div id="world-map" style={{ height: 250 + 'px', width: 100 + '%' }}></div>
                            </div>

                            <div className="card-footer bg-transparent">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <div id="sparkline-1"></div>
                                        <div className="text-white">Visitors</div>
                                    </div>

                                    <div className="col-4 text-center">
                                        <div id="sparkline-2"></div>
                                        <div className="text-white">Online</div>
                                    </div>

                                    <div className="col-4 text-center">
                                        <div id="sparkline-3"></div>
                                        <div className="text-white">Sales</div>
                                    </div>

                                </div>

                            </div>
                        </div>



                        <div className="card bg-gradient-info">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                    <i className="fas fa-th mr-1"></i>
  Sales Graph
</h3>

                                <div className="card-tools">
                                    <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <canvas className="chart" id="line-chart" style={{ minHeight: 250 + 'px', height: 250 + 'px', maxHeight: 250 + 'px', maxWidth: 100 + '%' }}></canvas>
                            </div>

                            <div className="card-footer bg-transparent">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" />

                                        <div className="text-white">Mail-Orders</div>
                                    </div>

                                    <div className="col-4 text-center">
                                        <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60}
                                            data-fgcolor="#39CCCC" />

                                        <div className="text-white">Online</div>
                                    </div>

                                    <div className="col-4 text-center">
                                        <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60}
                                            data-fgcolor="#39CCCC" />

                                        <div className="text-white">In-Store</div>
                                    </div>

                                </div>

                            </div>

                        </div>



                        <div className="card bg-gradient-success">
                            <div className="card-header border-0">

                                <h3 className="card-title">
                                    <i className="far fa-calendar-alt"></i>
  Calendar
</h3>

                                <div className="card-tools">

                                    <div className="btn-group">
                                        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset="-52">
                                            <i className="fas fa-bars"></i></button>
                                        <div className="dropdown-menu" role="menu">
                                            <a href="#" className="dropdown-item">Add new event</a>
                                            <a href="#" className="dropdown-item">Clear events</a>
                                            <div className="dropdown-divider"></div>
                                            <a href="#" className="dropdown-item">View calendar</a>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>

                            </div>

                            <div className="card-body pt-0">
                                <div id="calendar" style={{ width: 100 + '%' }}></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        
    );
};

export default Dashboard;
