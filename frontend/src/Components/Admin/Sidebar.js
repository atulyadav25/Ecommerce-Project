import React from 'react'
import './sidebar.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from "@material-ui/lab";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/'>
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <i className="fa-solid fa-database"></i>
                    Dashboard
                </p>
            </Link>
            <Link to="/admin/products">
                <TreeView
                    defaultCollapseIcon={<i className="fa-solid fa-sort-down"></i>}
                    defaultExpandIcon={<i className="fa-solid fa-arrow-down-short-wide"></i>}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<i className="fa-solid fa-list"></i>} />
                        </Link>

                        <Link to="/admin/product/new">
                            <TreeItem nodeId="3" label="Create" icon={<i className="fa-solid fa-plus"></i>} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                <i className="fa-solid fa-box-open"></i>
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                <i className="fa-solid fa-users"></i> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                <i className="fa-solid fa-feather-pointed"></i>Reviews
                </p>
            </Link>
        </div>
    )
}

export default Sidebar