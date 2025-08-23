import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import Contact from "@/pages/Contact";
import AdminDashboardPage from "@/pages/dashboard/admin/AdminDashboardPage";
import AdminAgentsPage from "@/pages/dashboard/admin/AgentsPage";
import AdminSettingsPage from "@/pages/dashboard/admin/SettingsPage";
import AdminTransactionsPage from "@/pages/dashboard/admin/TransactionsPage";
import AdminUsersPage from "@/pages/dashboard/admin/UserPage";
import AgentDashboardPage from "@/pages/dashboard/agent/AgentDashboardPage";
import CashOperationsPage from "@/pages/dashboard/agent/CashOperationsPage";
import CommissionPage from "@/pages/dashboard/agent/Commission";
import AgentProfilePage from "@/pages/dashboard/agent/Profile";
import AgentTransactionsPage from "@/pages/dashboard/agent/Transactions";
import ProfilePage from "@/pages/dashboard/user/Profile";
import TransactionsPage from "@/pages/dashboard/user/Transactions";
import UserDashboardPage from "@/pages/dashboard/user/UserDashboardPage";
import WalletPage from "@/pages/dashboard/user/Wallet";
import FAQPage from "@/pages/Faq";
import FeaturesPage from "@/pages/Features";
import Home from "@/pages/Home";
import PricingPage from "@/pages/Pricing";
import { createBrowserRouter } from "react-router";

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
        Component: UserDashboardPage,
        path: "user",
      },
      {
        Component: ProfilePage,
        path: "user/profile",
      },
      {
        Component: TransactionsPage,
        path: "user/transactions",
      },
      {
        Component: WalletPage,

        path: "user/wallet",
      },
      {
        Component: AgentDashboardPage,
        path: "agent",
      },
      {
        Component: CashOperationsPage,
        path: "agent/cash-operations",
      },
      {
        Component: AgentProfilePage,
        path: "agent/profile",
      },
      {
        Component: CommissionPage,
        path: "agent/commission",
      },
      {
        Component: AgentTransactionsPage,
        path: "agent/transactions",
      },
      {
        Component: AdminDashboardPage,
        path: "admin",
      },
      {
        Component: AdminAgentsPage,
        path: "admin/agents",
      },
      {
        Component: AdminUsersPage,
        path: "admin/users",
      },
      {
        Component: AdminSettingsPage,
        path: "admin/settings",
      },
      {
        Component: AdminTransactionsPage,
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
]);
