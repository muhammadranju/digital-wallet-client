import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/Login";
import OtpPage from "@/pages/auth/OtpPage";
import SignupPage from "@/pages/auth/Signup";
import Contact from "@/pages/Contact";
import AdminDashboardPage from "@/pages/dashboard/admin/AdminDashboardPage";
import AdminAgentsPage from "@/pages/dashboard/admin/AgentsPage";
import AdminSettingsPage from "@/pages/dashboard/admin/SettingsPage";
import AdminTransactionsPage from "@/pages/dashboard/admin/TransactionsPage";
import AdminUsersPage from "@/pages/dashboard/admin/UserPage";
import CashOperationsPage from "@/pages/dashboard/agent/CashOperationsPage";
import CommissionPage from "@/pages/dashboard/agent/Commission";
import AgentProfilePage from "@/pages/dashboard/agent/Profile";
import AgentTransactionsPage from "@/pages/dashboard/agent/Transactions";
import ProfilePage from "@/pages/dashboard/user/Profile";
import TransactionsPage from "@/pages/dashboard/user/Transactions";
import WalletPage from "@/pages/dashboard/user/Wallet";
import FAQPage from "@/pages/Faq";
import FeaturesPage from "@/pages/Features";
import Home from "@/pages/Home";
import PricingPage from "@/pages/Pricing";
import { createBrowserRouter } from "react-router";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";

export const router = createBrowserRouter([
  {
    Component: App,

    path: "/",
    children: [
      {
        index: true,
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: FAQPage,
        path: "faq",
      },
      {
        Component: FeaturesPage,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: PricingPage,
        path: "pricing",
      },
    ],
  },
  {
    Component: AdminLayout,
    path: "dashboard",
    children: [
      {
        Component: () => (
          <PrivateRoute>
            <UserRoute>
              <WalletPage />
            </UserRoute>
          </PrivateRoute>
        ),

        path: "user",
      },
      {
        Component: () => (
          <PrivateRoute>
            <UserRoute>
              <ProfilePage />
            </UserRoute>
          </PrivateRoute>
        ),
        path: "user/profile",
      },
      {
        Component: () => (
          <PrivateRoute>
            <UserRoute>
              <TransactionsPage />
            </UserRoute>
          </PrivateRoute>
        ),
        path: "user/transactions",
      },
      {
        Component: () => (
          <PrivateRoute>
            <UserRoute>
              <WalletPage />
            </UserRoute>
          </PrivateRoute>
        ),

        path: "user/wallet",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AgentRoute>
              <CashOperationsPage />
            </AgentRoute>
          </PrivateRoute>
        ),
        path: "agent/",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AgentRoute>
              <CashOperationsPage />
            </AgentRoute>
          </PrivateRoute>
        ),

        path: "agent/cash-operations",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AgentRoute>
              <AgentProfilePage />
            </AgentRoute>
          </PrivateRoute>
        ),
        path: "agent/profile",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AgentRoute>
              <CommissionPage />
            </AgentRoute>
          </PrivateRoute>
        ),
        path: "agent/commission",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AgentRoute>
              <AgentTransactionsPage />
            </AgentRoute>
          </PrivateRoute>
        ),
        path: "agent/transactions",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          </PrivateRoute>
        ),
        path: "admin",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AdminRoute>
              <AdminAgentsPage />
            </AdminRoute>
          </PrivateRoute>
        ),
        path: "admin/agents",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          </PrivateRoute>
        ),

        path: "admin/users",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AdminRoute>
              <AdminSettingsPage />
            </AdminRoute>
          </PrivateRoute>
        ),

        path: "admin/settings",
      },
      {
        Component: () => (
          <PrivateRoute>
            <AdminRoute>
              <AdminTransactionsPage />
            </AdminRoute>
          </PrivateRoute>
        ),
        path: "admin/transactions",
      },
    ],
  },
  {
    Component: SignupPage,
    path: "auth/signup",
  },
  {
    Component: LoginPage,
    path: "auth/login",
  },
  {
    Component: ForgotPasswordPage,
    path: "auth/forgot-password",
  },
  {
    Component: OtpPage,
    path: "auth/otp-verification/:userEmail",
  },
]);
