import AdminDashboardComponent from "../components/AdminDashboardComponent";
import CustomerDashboardComponent from "../components/CustomerDashboardComponent";
import EmployeeDashboardComponent from "../components/EmployeeDashboardComponent";
import { useLocation } from "react-router-dom";


export default function Dashboard() {
    
    const renderDashboardByRole = (role: string) => {
        if (role === 'admin') return AdminDashboardComponent;
        if (role === 'employee') return EmployeeDashboardComponent;
        if (role === 'customer') return CustomerDashboardComponent;
        return null;
    };
   
    const location = useLocation() as { state?: { role?: string } };
    const role = location.state?.role || ''
    
    return (
        <>{renderDashboardByRole(role)}</>
    );
};