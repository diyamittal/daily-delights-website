import React, { useEffect, useState } from "react"
import '../style/admin.css'

export default function Admin(){
    const [stats, setStats] = useState(null)
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchAll = async()=>{
            try {
                const [statsRes, ordersRes, usersRes] = await Promise.all([
                    fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/admin/stats`),
                    fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/admin/orders`),
                    fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/admin/users`)
                ])
                setStats(await statsRes.json())
                setOrders(await ordersRes.json())
                setUsers(await usersRes.json())
            } catch(err){}
            finally { setLoading(false) }
        }
        fetchAll()
    }, [])

    const deleteProduct = async(id)=>{
        await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/products/${id}`, { method: 'DELETE' })
        setOrders(prev => prev.map(o => ({...o, items: o.items.filter(i => i.id !== id)})))
    }

    if(loading) return <div className="admin-loading">Loading dashboard...</div>

    return (
        <div className="admin">
            <h2 className="admin-title">Admin Dashboard</h2>

            <div className="admin-tabs">
                {['overview', 'orders', 'users'].map(tab => (
                    <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={()=>setActiveTab(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && stats && (
                <div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Total Orders</h3>
                            <p>{stats.totalOrders}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Users</h3>
                            <p>{stats.totalUsers}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Revenue</h3>
                            <p>Rs {stats.totalRevenue}</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <tr key={i}>
                                    <td>{order._id?.slice(-6)}</td>
                                    <td>{order.userId?.name || 'N/A'}</td>
                                    <td>{order.items?.length} items</td>
                                    <td>Rs {order.totalAmount}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td><span className={`order-status status-${order.status?.toLowerCase()}`}>{order.status}</span></td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.isAdmin ? '✅' : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
