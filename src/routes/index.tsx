import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import Contact from "@/pages/Contact";
import AdminDashboardPage from "@/pages/dashboard/admin/AdminDashboardPage";
import AgentDashboardPage from "@/pages/dashboard/agent/AgentDashboardPage";
import CashOperationsPage from "@/pages/dashboard/agent/CashOperationsPage";
import CommissionPage from "@/pages/dashboard/agent/Commission";
import AgentProfilePage from "@/pages/dashboard/agent/Profile";
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
        path: "agents",
      },
      {
        Component: CashOperationsPage,
        path: "agents/cash-operations",
      },
      {
        Component: AgentProfilePage,
        path: "agents/profile",
      },
      {
        Component: CommissionPage,
        path: "agents/commission",
      },
      {
        Component: TransactionsPage,
        path: "agents/transactions",
      },
      {
        Component: AdminDashboardPage,
        path: "admin",
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
